import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import mongoose from "mongoose";
import "#lib/server/db.ts";
import Submission from "#lib/server/models/submission.model.ts";

export const GET: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Log in first.");
  if (!mongoose.isValidObjectId(params.id)) error(400, "Bad id.");

  const doc = await Submission.findById(params.id)
    .select("file kind submittedBy")
    .lean();

  if (!doc || doc.kind !== "file" || !doc.file?.data) {
    error(404, "Not found.");
  }

  const isOwner = String(doc.submittedBy) === String(locals.user.email);
  const isAdmin = locals.user.role === "admin";
  if (!isOwner && !isAdmin) error(403, "Not yours.");

  // The driver can hand back several shapes depending on how the document was stored
  const raw: unknown = doc.file.data;
  const obj = raw as { buffer?: unknown; value?: unknown; data?: unknown } | null | undefined;
  let bytes: Buffer;

  if (Buffer.isBuffer(raw)) {
    bytes = raw;
  } else if (raw instanceof Uint8Array) {
    bytes = Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength);
  } else if (obj && obj.buffer instanceof Uint8Array) {
    bytes = Buffer.from(obj.buffer);
  } else if (obj && obj.buffer instanceof ArrayBuffer) {
    bytes = Buffer.from(obj.buffer);
  } else if (obj && typeof obj.value === "function") {
    bytes = Buffer.from((obj.value as (asRaw: boolean) => Uint8Array)(true));
  } else if (obj && obj.data && Array.isArray(obj.data)) {
    bytes = Buffer.from(obj.data);
  } else if (Array.isArray(raw)) {
    bytes = Buffer.from(raw);
  } else {
    error(500, "Unrecognized data format.");
  }

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": doc.file.mimeType ?? "application/octet-stream",
      "Content-Length": String(bytes.length),
      "Cache-Control": "private, max-age=300",
      "Content-Disposition": `inline; filename="${encodeURIComponent(
        doc.file.name ?? "file",
      )}"`,
    },
  });
}
