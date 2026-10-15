import { lucia } from "#lib/server/lucia.js";

export async function handle({ event, resolve }) {
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session?.fresh) {
    const c = lucia.createSessionCookie(session.id);
    event.cookies.set(c.name, c.value, { path: ".", ...c.attributes });
  }
  if (!session) {
    const c = lucia.createBlankSessionCookie();
    event.cookies.set(c.name, c.value, { path: ".", ...c.attributes });
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
}
