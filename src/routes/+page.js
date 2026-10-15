export async function load({fetch}) {
  try {
     const res = await fetch('/api/quiz')
  const courses = await res.json()
  return {courses}

  } catch (error) {
    let courses = []
    return {courses}
  }
 }
