import { json } from "@sveltejs/kit";
import Quiz from "$lib/server/models/quiz.js";

export async function GET({ request, event }) {
  const api = await Quiz.find()
  return json(api);
}
