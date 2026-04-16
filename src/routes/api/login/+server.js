
import argon2 from "argon2";
import { lucia } from "$lib/server/lucia";
import { User } from "$lib/server/models/user";
import { redirect } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
export async function POST({ request, event }) {

  const { email, password } =
    await request.json();

  const user =
    await User.findOne({ email });

  if (!user) {
    return new Response("Invalid", { status: 400 });
  }

  const valid =
    await argon2.verify(
      user.passwordHash,
      password
    );

  if (!valid) {
    return new Response("Invalid", { status: 400 });
  }

  const session =
    await lucia.createSession(
      user._id,
      {
        email: user.email,
        role: user.role
      }
    );

  const sessionCookie =
    lucia.createSessionCookie(
      session.id
    );



  return json({ status: 201, session: sessionCookie });
}
