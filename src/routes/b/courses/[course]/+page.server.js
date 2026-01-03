export async function load({ params, fetch, url }) {
  const prodApi = "https://examinu-api.up.railway.app";
  const devApi = "http://127.0.0.1:8080";
  const env = prodApi;
  const { course } = params;
  const q = url.searchParams.get('q') ?? '0';
  const quizData = await fetch(`${env}/api/quiz/${course}?q=${q}`);
  const quiz = await quizData.json();
  const quizLength = await fetch(`${env}/api/quiz/${course}/length`);
  const length = await quizLength.text();
  return { quiz, length, course }

}
