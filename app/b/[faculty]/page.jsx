import DepartmentList from "./client";

const prodApi = "https://examinu-api.up.railway.app"
const devApi = "http://127.0.0.1:8080";
export async function generateMetadata({ params }) {
  const { faculty } = await params;
  const faculties = await fetch(`${devApi}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  return {
    title: `${facultyName}`,
  };
}

export default async function Home({ params }) {
  const { faculty } = await params;
  const faculties = await fetch(`${devApi}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  try {
    const names = await fetch(`${devApi}/api/${faculty}/departments/names`);
    const links = await fetch(`${devApi}/api/${faculty}/departments/codes`);
    const departmentList = await links.json();
    const departmentNames = await names.json();


    return (
      <main>
        <div className="title">
          <h3>{facultyName}</h3>

        </div>
        <h5>Select Your Department</h5>
        <DepartmentList
          departmentList={departmentList}
          departmentNames={departmentNames} faculty={
            faculty
          }
        />

      </main>
    )
  } catch (error) {
    return (
      <main>
        <h2>Error loading department list</h2>
        <Link href={`/b/${faculty}`}><p>Try again</p></Link>
      </main >

    );
  }
}
