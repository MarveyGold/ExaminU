import { lucia } from "#lib/server/lucia.js";
import { User } from "#lib/server/models/user.js";
import { redirect, fail } from "@sveltejs/kit";

export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, cookies, url }) => {
    // only allow same-site relative redirects
    const target = url.searchParams.get("redirect");
    const redirectTo =
      target && target.startsWith("/") && !target.startsWith("//") ? target : "/";

    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      return fail(400, { error: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) return fail(400, { error: "Invalid email or password" });

    let valid = false;
    try {
      valid = await Bun.password.verify(password, user.passwordHash);
    } catch {
      valid = false; // malformed hash
    }
    if (!valid) return fail(400, { error: "Invalid email or password" });

    const session = await lucia.createSession(user._id, {
      email: user.email,
      role: user.role,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    redirect(303, redirectTo);
  },
};
