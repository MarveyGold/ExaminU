import { API_URL } from "$env/static/private";
export async function load({ params, fetch }) {
  const { faculty } = params;
  const env = API_URL;
  const faculties = await fetch(`${env}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  const names = await fetch(`${env}/api/${faculty}/departments/names`);
  const links = await fetch(`${env}/api/${faculty}/departments/codes`);
  const departmentList = await links.json();
  const departmentNames = await names.json();
  return { faculty, facultyName, departmentNames, departmentList }
}
