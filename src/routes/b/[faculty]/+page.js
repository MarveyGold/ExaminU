export async function load({ params, fetch }) {
  const { faculty } = params;
  const prodApi = "https://examinu-api.up.railway.app"
  const devApi = "http://127.0.0.1:8080";
  const faculties = await fetch(`${prodApi}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  const names = await fetch(`${prodApi}/api/${faculty}/departments/names`);
  const links = await fetch(`${prodApi}/api/${faculty}/departments/codes`);
  const departmentList = await links.json();
  const departmentNames = await names.json();
  return { faculty, facultyName, departmentNames, departmentList }
}
