import styles from "../styles/button.module.css";
import Faculty from "./client.jsx";

export default async function Home() {
  const faculties = await fetch("https://examinu-api.up.railway.app/api/faculty/names");
  const facultyList = await fetch("https://examinu-api.up.railway.app/api/faculty/codes");
  const names = await faculties.json();
  const codes = await facultyList.json();
  console.log(names);
  console.log(codes);

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
}
