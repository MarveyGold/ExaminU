import Faculty from "$lib/server/models/faculty.model.js";

export async function load() {
  // load all faculties (name and code) from the Faculty collection
  const faculties = await Faculty.find({}, { _id: 0, name: 1, code: 1 }).lean();
  const names = faculties.map((f) => f.name);
  const codes = faculties.map((f) => f.code);
  return { names, codes };
}
