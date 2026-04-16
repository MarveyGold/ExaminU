import { redirect } from "@sveltejs/kit";
import { User } from "$lib/server/models/user";
import argon2 from "argon2";

export async function load() { }

export const actions = {
  default: async ({ request, url }) => {
    const Redirect = url.searchParams.get("redirect") ?? "/"
    const form = await request.formData();
    const email = form.get("email") || "";
    const password = form.get("password") || "";

    if (!email || !password) {
      return { error: "Missing email or password" };
    }

    const existing = await User.findOne({ email });
    if (existing) return { error: "User already exists" };

    const passwordHash = await argon2.hash(password);

    await User.create({ email, passwordHash, role: "user" });

    throw redirect(303, "/login")
  }
};
