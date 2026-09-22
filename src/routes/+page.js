export async function load({fetch}) {
  const res = await fetch('/api/quiz')
  const courses = await res.json()
  return {courses}
}
