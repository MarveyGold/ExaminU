export async function load({ params, fetch, url }) {
  const prodApi = "https://examinu-api.up.railway.app";
  const devApi = "http://127.0.0.1:8080";

  const env = prodApi;
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
