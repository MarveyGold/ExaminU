import Link from "next/link";
import styles from "@/app/styles/home.module.css"
import CourseList from "./client";

const prodApi = "https://examinu-api.up.railway.app"
const devApi = "http://127.0.0.1:8080";
const env = prodApi;
export async function generateMetadata({ params, searchParams }) {
  const { faculty, department } = await params;
  const { level } = await searchParams;

  const faculties = await fetch(`${env}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  const departmentNameData = await fetch(`${env}/api/${faculty}/${department}/name`);
  const departmentName = await departmentNameData.text();

  return {
    title: `${departmentName}`,
    description: `Revise with past questions and likely exam questions of the ${level} level courses offered by the ${departmentName} under the ${facultyName} `,
  };


}

export default async function Home({ params, searchParams }) {
  const { faculty, department } = await params;
  const { level } = await searchParams;
  const courselist = await fetch(`${env}/api/${faculty}/${department}/courses`);
  const courses = await courselist.json();
  console.log(courses)
  const departmentNameData = await fetch(`${env}/api/${faculty}/${department}/name`);
  const departmentName = await departmentNameData.text();
  return (
    <main>
      <div className={styles.course}>
        <div style={{ position: "fixed", top: "13vh", width: "90vw", display: "flex", alignItems: "center", justifyContent: "center" }}> <h2 className="title">
          {departmentName}</h2></div>
        <nav className={styles.nav}>
          <Link href="?level=100"><button style={level == 200 ? { opacity: 0.5 } : { opacity: 1 }} className={styles.navButton}><h3>100 Level</h3></button></Link>
          <Link href="?level=200"><button style={level == 200 ? { opacity: 1 } : { opacity: 0.4 }} className={styles.navButton}><h3>200 Level</h3></button></Link>
        </nav>
        <CourseList
          faculty={faculty}
          department={department}
          level={level}
          courses={courses}
        />
      </div >
    </main >
  )
}
