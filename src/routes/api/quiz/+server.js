import { json } from "@sveltejs/kit";
import Quiz from "$lib/server/models/quiz.js";

export async function GET({ request, event }) {
  await Quiz.updateMany({ exam: { $ne: "post-utme" } }, { $set: { exam: "school" } });
  const api = await Quiz.find();
  return json(api);
}
