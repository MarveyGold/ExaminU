// #lib/server/uplexport const MAX_FILES = 5;
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_TEXT_BYTES = 2 * 1024 * 1024;
export const DAILY_FILE_LIMIT = 20;

export const TYPES = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  csv: "text/csv",
  json: "application/json",
};

export const ACCEPT = Object.keys(TYPES).map((e) => "." + e).join(",");

export const cleanName = (n) =>
  String(n ?? "file")
    .split(/[\\/]/)
    .pop()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 120) || "file";

export function isUtf8Text(bytes) {
  if (bytes.includes(0)) return false;
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}

export function looksLike(ext, b) {
  switch (ext) {
    case "pdf":
      return b.subarray(0, 4).toString("latin1") === "%PDF";
    case "png":
      return b[0] === 0x89 && b.subarray(1, 4).toString("latin1") === "PNG";
    case "jpg":
    case "jpeg":
      return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
    case "webp":
      return (
        b.subarray(0, 4).toString("latin1") === "RIFF" &&
        b.subarray(8, 12).toString("latin1") === "WEBP"
      );
    case "gif":
      return b.subarray(0, 4).toString("latin1") === "GIF8";
    case "csv":
    case "json":
      return b.length <= MAX_TEXT_BYTES && isUtf8Text(b);
    default:
      return false;
  }
}
