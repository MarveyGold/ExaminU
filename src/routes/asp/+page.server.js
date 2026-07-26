import Quiz from "$lib/server/models/quiz.js";



export async function load() {
  const subjects = await Quiz.distinct("title", { exam: "post-utme" })
  return {
    subjects
  };
};
