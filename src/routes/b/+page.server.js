import { API_URL } from "$env/static/private";
export async function load({ fetch }) {

  const faculties = await fetch(`${API_URL}/api/faculty/names`);
  const facultyList = await fetch(`${API_URL}/api/faculty/codes`);
  const names = await faculties.json();
  const codes = await facultyList.json();
  return { names, codes }
}
