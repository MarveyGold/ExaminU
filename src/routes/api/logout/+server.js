
import { lucia } from "$lib/server/lucia";

export async function GET({ cookies }) {

  const sessionId =
    cookies.get("session");

  if (!sessionId) {
    return new Response("No session");
  }

  await lucia.invalidateSession(sessionId);

  const blank =
    lucia.createBlankSessionCookie();

  cookies.set(
    blank.name,
    blank.value,
    blank.attributes
  );

  return new Response("Logged out");
}
