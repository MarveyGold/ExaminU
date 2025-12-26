import styles from "../styles/button.module.css";
import Faculty from "./client.jsx";
import Link from "next/link"

export default async function Home() {
  const prodApi = "https://examinu-api.up.railway.app"
  const devApi = "http://127.0.0.1:8080"
  try {
    const faculties = await fetch(`${devApi}/api/faculty/names`);
    const facultyList = await fetch(`${devApi}/api/faculty/codes`);
    const names = await faculties.json();
    const codes = await facultyList.json();


    return (
      <main className="main">
        <h1 className="header">Select Faculty</h1>
        <div className={styles.container}>
          <div>
            <Faculty
              names={names}
              codes={codes}
            />
          </div>
        </div>
      </main>

    );
  } catch (error) {
    return (
      <main>
        <h3>Error loading faculties</h3>
        <Link href='/b/'><button className="footerButton">
          <p>
            Try Again
          </p>
        </button></Link>
      </main >
    )
  }
}
