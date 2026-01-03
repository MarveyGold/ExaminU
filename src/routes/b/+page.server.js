export async function load({ fetch }) {
  const prodApi = "https://examinu-api.up.railway.app";
  const devApi = "http://127.0.0.1:8080";

  const faculties = await fetch(`${prodApi}/api/faculty/names`);
  const facultyList = await fetch(`${prodApi}/api/faculty/codes`);
  const names = await faculties.json();
  const codes = await facultyList.json();
  return { names, codes }
}
