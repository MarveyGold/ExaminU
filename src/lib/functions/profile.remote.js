import { query, form, getRequestEvent } from "$app/server";
import { error, invalid, redirect } from "@sveltejs/kit";
import * as v from "valibot";
import "#lib/server/db.js";
import { User } from "#lib/server/models/user.js";
import Faculty from "#lib/server/models/faculty.model.js";
import Department from "#lib/server/models/department.model.js";
import Submission from "#lib/server/models/submission.model.js";
import { lucia } from "#lib/server/lucia.js";
import { savedDepartment } from "#lib/server/department.js";
import { LEVELS, USERNAME_RE, isReserved, cleanName } from "#lib/profile.js";

function requireUser() {
  const event = getRequestEvent();
  if (!event.locals.user?.id) error(401, "Log in to continue.");
  return { event, userId: String(event.locals.user.id) };
}

export const getProfile = query(async () => {
  const { event, userId } = requireUser();

  const [user, submitted, approved, saved] = await Promise.all([
    User.findById(userId, "email name username level createdAt").lean(),
    Submission.countDocuments({ submittedBy: userId }),
    Submission.countDocuments({ submittedBy: userId, status: "approved" }),
    savedDepartment(event), // database first, then the guest cookie
  ]);
  if (!user) error(401, "Log in again to continue.");

  const [faculty, department] = saved
    ? await Promise.all([
      Faculty.findOne({ code: saved.faculty }, "name").lean(),
      Department.findOne({ code: saved.department, facultyCode: saved.faculty }, "name").lean(),
    ])
    : [null, null];

  return {
    email: user.email,
    name: user.name ?? "",
    username: user.username ?? "",
    level: LEVELS.includes(user.level) ? user.level : "100",
    joined: user.createdAt?.toISOString() ?? "",
    facultyName: faculty?.name ?? "",
    departmentName: department?.name ?? "",
    submitted,
    approved,
  };
});

export const updateProfile = form(
  v.object({
    name: v.optional(
      v.pipe(v.string(), v.transform(cleanName), v.maxLength(60, "Your name must be 60 characters or fewer.")),
      "",
    ),
    username: v.optional(
      v.pipe(
        v.string(),
        v.transform((s) => s.trim().toLowerCase().replace(/^@/, "")),
        v.check((u) => u === "" || USERNAME_RE.test(u), "Usernames are 3 to 20 letters, numbers or underscores."),
        v.check((u) => !isReserved(u), "That username isn't available."),
      ),
      "",
    ),
    level: v.picklist(LEVELS, "Choose a level."),
  }),
  async ({ name, username, level }, issue) => {
    const { userId } = requireUser();

    const $set = { level };
    const $unset = {};
    if (name) $set.name = name; else $unset.name = "";
    if (username) $set.username = username; else $unset.username = "";

    try {
      await User.updateOne(
        { _id: userId },
        { $set, ...(Object.keys($unset).length ? { $unset } : {}) },
        { runValidators: true },
      );
    } catch (err) {
      if (err?.code === 11000) invalid(issue.username("That username is taken."));
      throw err;
    }

    return { success: true };
  },
);

// Field names start with "_" so SvelteKit never sends the passwords back to the browser
export const changePassword = form(
  v.object({
    _current: v.pipe(
      v.string(),
      v.minLength(1, "Enter your current password."),
      v.maxLength(200, "That password is too long."),
    ),
    _next: v.pipe(
      v.string(),
      v.minLength(8, "Your new password must be at least 8 characters."),
      v.maxLength(200, "That password is too long."),
    ),
    _confirm: v.string(),
  }),
  async ({ _current, _next, _confirm }, issue) => {
    const { event, userId } = requireUser();

    if (_next !== _confirm) invalid(issue._confirm("The new passwords don't match."));
    if (_next === _current) invalid(issue._next("Choose a different password from your current one."));

    const user = await User.findById(userId);
    if (!user) error(401, "Log in again to continue.");

    let ok = false;
    try {
      ok = await Bun.password.verify(_current, user.passwordHash);
    } catch {
      ok = false;
    }
    if (!ok) invalid(issue._current("Your current password is wrong."));

    user.passwordHash = await Bun.password.hash(_next, { algorithm: "argon2id", memoryCost: 65536, timeCost: 3 });
    await user.save();

    // Sign out everywhere else, then keep this device signed in
    await lucia.invalidateUserSessions(user._id);
    const session = await lucia.createSession(user._id, { email: user.email, role: user.role });
    const cookie = lucia.createSessionCookie(session.id);
    event.cookies.set(cookie.name, cookie.value, { path: ".", ...cookie.attributes });

    return { success: true };
  },
);

export const logout = form(v.object({}), async () => {
  const { locals, cookies } = getRequestEvent();
  if (locals.session) await lucia.invalidateSession(locals.session.id);
  const blank = lucia.createBlankSessionCookie();
  cookies.set(blank.name, blank.value, { path: ".", ...blank.attributes });
  redirect(303, "/");
});
