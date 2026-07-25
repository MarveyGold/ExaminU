
import { lucia } from "$lib/server/lucia.js";
import { User } from "$lib/server/models/user.js";
import argon2 from "argon2";
import { redirect, fail } from "@sveltejs/kit";

export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, cookies, url }) => {
    const redirectTo = url.searchParams.get("redirect") ?? "/";
    const form = await request.formData();
    const email = form.get("email") || "";
    const password = form.get("password") || "";

    const user = await User.findOne({ email });
    if (!user) return fail(400, { error: "Invalid email or password" });

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) return fail(400, { error: "Invalid email or password" });

    const session = await lucia.createSession(user._id, {
      email: user.email,
      role: user.role,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect(303, redirectTo);
  }
};
