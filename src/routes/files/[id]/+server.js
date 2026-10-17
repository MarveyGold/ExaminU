import { error } from "@sveltejs/kit";
import mongoose from "mongoose";
import "#lib/server/db.js";
import Submission from "#lib/server/models/submission.model.js";

export async function GET({ params, locals }) {
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

  const raw = doc.file.data;
  let bytes;

  if (Buffer.isBuffer(raw)) {
    bytes = raw;
  } else if (raw instanceof Uint8Array) {
    bytes = Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength);
  } else if (raw && raw.buffer instanceof Uint8Array) {
    bytes = Buffer.from(raw.buffer);
  } else if (raw && raw.buffer instanceof ArrayBuffer) {
    bytes = Buffer.from(raw.buffer);
  } else if (raw && typeof raw.value === "function") {
    bytes = Buffer.from(raw.value(true));
  } else if (raw && raw.data && Array.isArray(raw.data)) {
    bytes = Buffer.from(raw.data);
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
