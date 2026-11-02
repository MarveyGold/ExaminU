export const LEVELS = ["100", "200", "300", "400", "500", "600"] as const;
export type Level = (typeof LEVELS)[number];
export const isLevel = (l: unknown): l is Level => LEVELS.includes(l as Level);

export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const RESERVED = new Set([
  "admin", "administrator", "examinu", "support", "help", "root", "moderator", "staff", "me", "null", "undefined",
]);
export const isReserved = (u: string) => RESERVED.has(u);

export const cleanName = (s: unknown) =>
  String(s ?? "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim();

export const displayName = (name: unknown, email: unknown) =>
  cleanName(name) || String(email ?? "").split("@")[0];

export function initials(name: unknown, email?: unknown): string {
  const words = cleanName(name).split(" ").filter(Boolean);
  if (words.length) {
    return (Array.from(words[0])[0] + (words[1] ? Array.from(words[1])[0] : "")).toUpperCase();
  }
  return (Array.from(String(email ?? "?"))[0] ?? "?").toUpperCase();
}
