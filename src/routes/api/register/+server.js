
import argon2 from "argon2";
import { User } from "$lib/server/models/user";

export async function POST({ request }) {

  const { email, password } =
    await request.json();

  if (!email || !password) {
    return new Response("Missing fields", { status: 400 });
  }

  const existing =
    await User.findOne({ email });

  if (existing) {
    return new Response("User exists", { status: 400 });
  }

  const passwordHash =
    await argon2.hash(password);

  const user = await User.create({
    email,
    passwordHash,
    role: "user"
  });

  return new Response(
    JSON.stringify({
      message: "User created",
      userId: user._id
    }),
    { status: 201 }
  );
}
