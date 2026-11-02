import { lucia } from "#lib/server/lucia.js";
import { User } from "#lib/server/models/user.js";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  let body: LoginBody;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password =
    typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return json({ error: "Invalid email or password" }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return json({ error: "Invalid email or password" }, { status: 400 });
  }

  let valid = false;

  try {
    valid = await Bun.password.verify(password, user.passwordHash);
  } catch {
    valid = false;
  }

  if (!valid) {
    return json({ error: "Invalid email or password" }, { status: 400 });
  }

  const session = await lucia.createSession(user._id.toString(), {
    email: user.email,
    role: user.role,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: "/",
    ...sessionCookie.attributes,
  });

  return json({ success: true });
};
