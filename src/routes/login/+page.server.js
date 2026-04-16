import { lucia } from "$lib/server/lucia.js";
import { User } from "$lib/server/models/user.js";
import argon2 from "argon2";
import { redirect } from "@sveltejs/kit";
export async function load() {

  return {};
}
export const actions = {
  default: async ({ request, cookies, url }) => {
    const Redirect = url.searchParams.get("redirect") ?? "/";
    const form = await request.formData();
    const email = form.get("email") || "";
    const password = form.get("password") || "";
    const res = await fetch(`${url.origin}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });
    const data = await res.json();
    if (res.ok) {
      const session = data.session;
      cookies.set(
        "session",
        session.value,
        session.attributes,
      );
      throw redirect(303, Redirect)
    } else {
      console.log('err');
    }

  }
};
