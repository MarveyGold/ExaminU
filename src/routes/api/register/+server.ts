import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { User } from "#lib/server/models/user.js";

type SignupBody = {
  email?: unknown;
  password?: unknown;
};
export const POST: RequestHandler = async ({ request }) => {
  let body: SignupBody;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password =
    typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return json({ error: "Missing email or password" }, { status: 400 });
  }

  if (password.length < 8) {
    return json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const existing = await User.findOne({ email });

  if (existing) {
    return json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 3,
  });

  let user;

  try {
    user = await User.create({ email, passwordHash, role: "user" });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === 11000
    ) {
      return json({ error: "User already exists" }, { status: 409 });
    }

    throw err;
  }

  return json(
    { message: "User created", userId: user._id },
    { status: 201 },
  );
};
