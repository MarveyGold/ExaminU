import type { Cookies } from "@sveltejs/kit";
import { dev } from "$app/env";
import Department from "./models/department.model.js";
import { User } from "./models/user.js";
import { isLevel, type Level } from "#lib/profile.js";

type Ctx = { locals: App.Locals; cookies: Cookies };
type Choice = { faculty: string; department: string };

const COOKIE = "examinu_department";
const safeLevel = (l: unknown): Level => (isLevel(l) ? l : "100");

function fromCookie(cookies: Cookies): Choice | null {
  const [faculty, department] = (cookies.get(COOKIE) ?? "").split(":");
  return faculty && department
    ? { faculty: faculty.slice(0, 20), department: department.slice(0, 20) }
    : null;
}

// The visitor's saved department: the account's choice first, then the guest cookie.
// Returns { faculty, department, level } or null. Only reads, so it's safe inside queries.
export async function savedDepartment({ locals, cookies }: Ctx): Promise<(Choice & { level: Level }) | null> {
  const userId = locals.user?.id ? String(locals.user.id) : null;
  const me = userId ? await User.findById(userId, "faculty department level").lean() : null;

  const fromDb: Choice | null = me?.faculty && me?.department
    ? { faculty: me.faculty, department: me.department }
    : null;
  const choice = fromDb ?? fromCookie(cookies);
  if (!choice) return null;

  // Ignore a choice that no longer exists, for example after reseeding
  if (!(await Department.exists({ code: choice.department, facultyCode: choice.faculty }))) return null;

  // A guest who has since signed up: copy their choice onto the account
  if (!fromDb && userId) await User.updateOne({ _id: userId }, { $set: choice });

  return { ...choice, level: safeLevel(me?.level) };
}

export async function userLevel(locals: App.Locals): Promise<Level> {
  if (!locals.user?.id) return "100";
  const me = await User.findById(String(locals.user.id), "level").lean();
  return safeLevel(me?.level);
}

// Writes a cookie, so call it only from a remote form or command
export async function saveDepartment({ locals, cookies }: Ctx, faculty: string, department: string): Promise<void> {
  cookies.set(COOKIE, `${faculty}:${department}`, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: !dev,
  });
  if (locals.user?.id) {
    await User.updateOne({ _id: String(locals.user.id) }, { $set: { faculty, department } });
  }
}
