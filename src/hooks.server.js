import { lucia } from "$lib/server/lucia.js";
export async function handle({ event, resolve, cookies }) {
  const sessionId = event.cookies.get("session");


  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session || !user) {
    const blankCookie = lucia.createBlankSessionCookie();
    event.cookies.set(
      blankCookie.name,
      blankCookie.value,
      blankCookie.attributes,
    );
    event.locals.user = { id: null, email: null, role: null };
    event.locals.session = null;
    return resolve(event);
  }

  event.locals.session = session;
  event.locals.user = user;

  return resolve(event);
}
