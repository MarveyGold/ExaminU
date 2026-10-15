import { command, query, getRequestEvent } from "$app/server";
import { error } from "@sveltejs/kit";
import * as v from "valibot";
import { createHash } from "node:crypto";
import "#lib/server/db.js";
import Quiz from "#lib/server/models/quiz.js";
import Submission from "#lib/server/models/submission.model.js";
import { normalizeQuestion, looseKey } from "#lib/questionSchema.js";

const DAILY_LIMIT = 300;
const hash = (s) => new Bun.CryptoHasher("sha1").update(s).digest("hex");

export const getQuizCourses = query(async () => {
  const titles = await Quiz.distinct("title");
  return titles.filter(Boolean).sort();
});

export const submitQuestions = command(
  v.object({
    exam: v.picklist(["school", "post-utme"]),
    items: v.pipe(v.array(v.unknown()), v.minLength(1), v.maxLength(100)),
  }),
  async ({ exam, items }) => {
    const { locals } = getRequestEvent();
    if (!locals.user?.id) error(401, "Log in to submit questions.");
    const userId = String(locals.user.id);

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const used = await Submission.countDocuments({ submittedBy: userId, createdAt: { $gte: since } });
    if (used + items.length > DAILY_LIMIT) {
      error(429, `You can submit up to ${DAILY_LIMIT} questions per day.`);
    }

    // Re-validate on the server. Never trust the browser's check.
    let rejected = 0;
    const byKey = new Map();
    for (const raw of items) {
      const r = normalizeQuestion(raw);
      if (!r.ok) { rejected++; continue; }
      const key = hash(looseKey(r.value.title, r.value.question));
      if (!byKey.has(key)) byKey.set(key, { ...r.value, exam, key, submittedBy: userId });
    }
    let candidates = [...byKey.values()];
    let duplicates = items.length - rejected - candidates.length; // repeated inside the batch

    // Already in the live quiz?
    const titles = [...new Set(candidates.map((c) => c.title))];
    const live = await Quiz.find({ title: { $in: titles } }, "title question").lean();
    const liveKeys = new Set(live.map((q) => hash(looseKey(q.title, q.question))));
    // Already submitted by anyone?
    const queued = await Submission.find({ key: { $in: candidates.map((c) => c.key) } }, "key").lean();
    const queuedKeys = new Set(queued.map((q) => q.key));

    const fresh = candidates.filter((c) => !liveKeys.has(c.key) && !queuedKeys.has(c.key));
    duplicates += candidates.length - fresh.length;

    let accepted = 0;
    if (fresh.length) {
      try {
        await Submission.insertMany(fresh, { ordered: false });
        accepted = fresh.length;
      } catch (err) {
        // A race with another upload hit the unique index; count the rest as duplicates.
        if (err?.code !== 11000 && !err?.writeErrors) throw err;
        accepted = err?.insertedDocs?.length ?? 0;
        duplicates += fresh.length - accepted;
      }
    }
    return { accepted, duplicates, rejected };
  },
);
