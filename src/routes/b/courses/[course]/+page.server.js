export async function load({ params, url }) {
  const { course } = params;

  const all = await Quiz.find({ title: course }).distinct('question');
  if (!all.length) {
    return { quiz: [], course, next: null };
  }

  const question = url.searchParams.get('q') ?? all[0];

  const remaining = all.filter(q => q !== question);
  const pool = remaining.length ? remaining : all;
  const next = pool[Math.floor(Math.random() * pool.length)];

  const quiz = await Quiz.find({ question }, { _id: 0 }).lean();
  return { quiz, course, next };
}
