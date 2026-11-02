import { lucia } from "#lib/server/lucia.js";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: "/",
    ...sessionCookie.attributes,
  });

  return json({ success: true });
};
