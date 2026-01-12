import { API_URL } from "$env/static/private";
export async function load({ params, fetch, url }) {
  const env = API_URL;
  const { course } = params;
  const q = url.searchParams.get('q') ?? '0';
  const quizData = await fetch(`${env}/api/quiz/${course}?q=${q}`);
  const quiz = await quizData.json();
  const quizLength = await fetch(`${env}/api/quiz/${course}/length`);
  const length = await quizLength.text();
  return { quiz, length, course }

}
