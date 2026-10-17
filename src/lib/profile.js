export const LEVELS = ["100", "200", "300", "400", "500", "600"];
export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const RESERVED = new Set([
  "admin", "administrator", "examinu", "support", "help", "root", "moderator", "staff", "me", "null", "undefined",
]);
export const isReserved = (u) => RESERVED.has(u);

export const cleanName = (s) =>
  String(s ?? "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim();

export const displayName = (name, email) => cleanName(name) || String(email ?? "").split("@")[0];

export function initials(name, email) {
  const words = cleanName(name).split(" ").filter(Boolean);
  if (words.length) {
    return (Array.from(words[0])[0] + (words[1] ? Array.from(words[1])[0] : "")).toUpperCase();
  }
  return (Array.from(String(email ?? "?"))[0] ?? "?").toUpperCase();
}
