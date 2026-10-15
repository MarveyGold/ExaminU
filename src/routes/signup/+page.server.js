import { redirect, fail } from "@sveltejs/kit";
import { User } from "#lib/server/models/user.js";

export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, url }) => {
    // only allow same-site relative redirects
    const target = url.searchParams.get("redirect");
    const safeTarget =
      target && target.startsWith("/") && !target.startsWith("//") ? target : null;

    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      return fail(400, { error: "Missing email or password" });
    }
    if (password.length < 8) {
      return fail(400, { error: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) return fail(400, { error: "User already exists" });

    const passwordHash = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 65536,
      timeCost: 3,
    });

    try {
      await User.create({ email, passwordHash, role: "user" });
    } catch (err) {
      // duplicate key: two signups raced past the findOne check
      if (err?.code === 11000) {
        return fail(400, { error: "User already exists" });
      }
      throw err;
    }

    redirect(
      303,
      safeTarget ? `/login?redirect=${encodeURIComponent(safeTarget)}` : "/login",
    );
  },
};
