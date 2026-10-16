// src/lib/functions/admin.remote.js
import { query, getRequestEvent } from "$app/server";
import { error } from "@sveltejs/kit";
import "#lib/server/db.js";
import { User } from "#lib/server/models/user.js";

export const listEmails = query(async () => {
  const { locals } = getRequestEvent();
  if (!locals.user) error(401, "Log in first.");
  if (locals.user.role !== "admin") error(403, "Admins only.");

  return (await User.distinct("email")).filter(Boolean).sort();
});
