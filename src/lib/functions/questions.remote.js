import { command, query, getRequestEvent } from "$app/server";
import { error } from "@sveltejs/kit";
import * as v from "valibot";
import "#lib/server/db.js";
import Quiz from "#lib/server/models/quiz.js";
import Submission from "#lib/server/models/submission.model.js";
import { normalizeQuestion, looseKey, COURSE_CODE } from "#lib/questionSchema.js";
import * as R from "#lib/server/upload-rules.js";

const DAILY_LIMIT = 300;

const sha1 = (data) =>
  new Bun.CryptoHasher("sha1").update(data).digest("hex");

const questionKey = (title, question) => sha1(looseKey(title, question));

function requireUserId() {
  const { locals } = getRequestEvent();
  if (!locals.user?.id) error(401, "Log in first.");
  return String(locals.user.email);
}

/* ---------------- queries ---------------- */

export const getQuizCourses = query(async () => {
  const titles = await Quiz.distinct("title");
  return titles.filter(Boolean).sort();
});

export const getUploadRules = query(() => ({
  maxFiles: R.MAX_FILES,
  maxFileBytes: R.MAX_FILE_BYTES,
  dailyLimit: R.DAILY_FILE_LIMIT,
  accept: R.ACCEPT,
}));

export const remainingDailyUploads = query(async () => {
  const userId = requireUserId();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const used = await Submission.countDocuments({
    kind: "file",
    submittedBy: userId,
    createdAt: { $gte: since },
  });
  return Math.max(0, R.DAILY_FILE_LIMIT - used);
});
export const getMySubmissions = query(async () => {
  const email = requireUserId(); // returns the email

  const docs = await Submission.find(
    { submittedBy: email },
    "kind exam status title note key createdAt file.name file.mimeType file.size",
  )
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((d) => ({
    id: String(d._id),
    kind: d.kind ?? "question",
    status: d.status ?? "pending",
    exam: d.exam ?? null,
    title: d.title ?? null,
    note: d.note ?? null,
    createdAt: d.createdAt ? d.createdAt.toISOString() : null,
    file:
      d.kind === "file" && d.file
        ? {
          name: d.file.name ?? null,
          mimeType: d.file.mimeType ?? null,
          size: d.file.size ?? 0,
        }
        : null,
  }));
});
/* ---------------- commands ---------------- */

export const submitQuestions = command(
  v.object({
    exam: v.picklist(["school", "post-utme"]),
    items: v.pipe(v.array(v.unknown()), v.minLength(1), v.maxLength(100)),
  }),
  async ({ exam, items }) => {
    const userId = requireUserId();

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const used = await Submission.countDocuments({
      kind: { $ne: "file" },
      submittedBy: userId,
      createdAt: { $gte: since },
    });
    if (used + items.length > DAILY_LIMIT) {
      error(429, `You can submit up to ${DAILY_LIMIT} questions per day.`);
    }

    let rejected = 0;
    const byKey = new Map();
    for (const raw of items) {
      const r = normalizeQuestion(raw);
      if (!r.ok) {
        rejected++;
        continue;
      }
      const key = questionKey(r.value.title, r.value.question);
      if (!byKey.has(key)) {
        byKey.set(key, { ...r.value, exam, key, submittedBy: userId });
      }
    }
    const candidates = [...byKey.values()];
    let duplicates = items.length - rejected - candidates.length;

    const titles = [...new Set(candidates.map((c) => c.title))];
    const live = await Quiz.find(
      { title: { $in: titles } },
      "title question",
    ).lean();
    const liveKeys = new Set(
      live.map((q) => questionKey(q.title, q.question)),
    );

    const queued = await Submission.find(
      { key: { $in: candidates.map((c) => c.key) } },
      "key",
    ).lean();
    const queuedKeys = new Set(queued.map((q) => q.key));

    const fresh = candidates.filter(
      (c) => !liveKeys.has(c.key) && !queuedKeys.has(c.key),
    );
    duplicates += candidates.length - fresh.length;

    let accepted = 0;
    if (fresh.length) {
      try {
        await Submission.insertMany(fresh, { ordered: false });
        accepted = fresh.length;
      } catch (err) {
        if (err?.code !== 11000 && !err?.writeErrors) throw err;
        accepted = err?.insertedDocs?.length ?? 0;
        duplicates += fresh.length - accepted;
      }
    }
    return { accepted, duplicates, rejected };
  },
);

export const uploadFiles = command(
  v.object({
    exam: v.picklist(["school", "post-utme"]),
    course: v.optional(v.string(), ""),
    note: v.optional(v.string(), ""),
    files: v.pipe(
      v.array(v.file()),
      v.minLength(1),
      v.maxLength(R.MAX_FILES),
    ),
  }),
  async ({ exam, course, note, files }) => {
    const userId = requireUserId();

    const title = String(course ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
    if (title && !COURSE_CODE.test(title)) {
      error(400, "Course code looks wrong (for example ECO111).");
    }

    const trimmedNote = String(note ?? "").trim().slice(0, 500);

    const usable = files.filter((f) => f.size > 0);
    if (!usable.length) error(400, "Choose at least one file.");

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const used = await Submission.countDocuments({
      kind: "file",
      submittedBy: userId,
      createdAt: { $gte: since },
    });
    if (used + usable.length > R.DAILY_FILE_LIMIT) {
      error(429, `You can upload up to ${R.DAILY_FILE_LIMIT} files per day.`);
    }

    let uploaded = 0;
    let duplicates = 0;
    const rejected = [];

    for (const file of usable) {
      const name = R.cleanName(file.name);
      const ext = name.includes(".")
        ? name.split(".").pop().toLowerCase()
        : "";
      const mimeType = R.TYPES[ext];

      if (!mimeType) {
        rejected.push({
          name,
          reason: "Use CSV, JSON, PDF, PNG, JPG, WebP or GIF.",
        });
        continue;
      }
      if (file.size > R.MAX_FILE_BYTES) {
        rejected.push({ name, reason: "Over 8 MB." });
        continue;
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      if (!R.looksLike(ext, bytes)) {
        rejected.push({
          name,
          reason:
            ext === "csv" || ext === "json"
              ? "Save it as UTF-8 text, under 2 MB."
              : `This doesn't look like a real .${ext} file.`,
        });
        continue;
      }

      const key = "file:" + sha1(bytes);
      if (await Submission.exists({ key })) {
        duplicates++;
        continue;
      }

      try {
        await Submission.create({
          kind: "file",
          exam,
          title: title || undefined,
          note: trimmedNote || undefined,
          key,
          submittedBy: userId,
          file: { name, mimeType, size: bytes.length, data: bytes },
        });
        uploaded++;
      } catch (err) {
        if (err?.code === 11000) duplicates++;
        else throw err;
      }
    }

    return { uploaded, duplicates, rejected };
  },
);;
