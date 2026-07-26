import { json } from "@sveltejs/kit";
import Data from "$lib/server/models/data.js";

export async function GET({ request, event }) {
  const api = await Data.find()
  return json(api);
}
