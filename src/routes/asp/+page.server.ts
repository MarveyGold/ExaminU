import Quiz from "#lib/server/models/quiz.ts";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async () => {
  const subjects = await Quiz.distinct("title", { exam: "post-utme" })
  return {
    subjects
  };
};
