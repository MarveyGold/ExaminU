import { json } from "@sveltejs/kit";
import Quiz from "$lib/server/models/quiz.js";

export async function GET({ request, event }) {
  await Quiz.updateMany(
    { exam: "school", optionA: { $exists: true } },
    [
      {
        $set: {
          options: {
            $filter: {
              input: ["$optionA", "$optionB", "$optionC", "$optionD", "$optionE"],
              as: "opt",
              cond: { $ne: ["$$opt", null] }
            }
          }
        }
      },
      { $unset: ["optionA", "optionB", "optionC", "optionD", "optionE"] }
    ],
    { updatePipeline: true }
  ); const api = await Quiz.find();
  return json(api);
}
