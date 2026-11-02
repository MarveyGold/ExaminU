import { json } from "@sveltejs/kit";
import Data from "#lib/server/models/data.js";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const api = await Data.find()
  return json(api);
}
