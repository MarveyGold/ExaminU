import Quiz from "$lib/server/models/quiz.js";
export async function load({ params, fetch, url }) {
  //const env = API_URL;
  const { subject } = params;


  const res = await fetch(`/data/subjects/${subject}.json`)
  const all = await res.json();
  // await Quiz.insertMany(all);
  const questions = all.map(item => item.question);
  const q = url.searchParams.get('q') ?? questions[0];
  const randomIndex = Math.floor(Math.random() * questions.length);
  const next = questions[randomIndex];
  const quiz = all.find(f => f.question == q);
  //  const quizData = await fetch(`${env}/api/quiz/${course}?q=${q}`);
  //  const quiz = await quizData.json();
  //  return { quiz, course, next }
  return { quiz, next, subject }
}
