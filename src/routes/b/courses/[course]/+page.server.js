import { API_URL } from "$env/static/private";
import Quiz from "$lib/server/models/quiz.js";
export async function load({ params, fetch, url }) {
  const env = API_URL;
  const { course } = params;


  // const quizLength = await fetch(`${env}/api/quiz/${course}/length`);
  const all = await Quiz.distinct("question").lean();
  const question = url.searchParams.get('q') ?? all[0];
  const randomIndex = Math.floor(Math.random() * all.length);
  const next = all[randomIndex];

  //  const quizData = await fetch(`${env}/api/quiz/${course}?q=${q}`);
  const quiz = await Quiz.find({ question }, { _id: 0 }).lean();
  return { quiz, course, next }

}
