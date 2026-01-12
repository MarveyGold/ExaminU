import { API_URL } from "$env/static/private";
export async function load({ params, fetch, url }) {

  const env = API_URL;
  const { faculty, department } = params;
  const level = url.searchParams.get('level') ?? '100';
  const courselist = await fetch(`${env}/api/${faculty}/${department}/courses`);
  const courses = await courselist.json();

  const faculties = await fetch(`${env}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  const departmentNameData = await fetch(`${env}/api/${faculty}/${department}/name`);
  const departmentName = await departmentNameData.text();
  return {
    faculty,
    department,
    level,
    courses,
    facultyName,
    departmentName
  }
}
