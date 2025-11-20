"use client";
import { useState } from "react";
import styles from "../styles/button.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import data from "@/public/data/faculties.json"

export default function Faculty() {
  const alert = useSearchParams().get('alert');
  
  const facultyList = data.map(f => f.code)
  const faculties = data.map(f => f.name);
  console.log(faculties)
  console.log(facultyList)
  const [current, setCurrent] = useState();
  const [search, setSearch] = useState("");
  const filtered = faculties
    .map((f, i) => ({ name: f, abbr: facultyList[i] }))
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <main className="main">    
      <div className="header"><h4>Select Faculty</h4> <h6>{alert}</h6></div> <div className={styles.container}>
        <input
        type='text'
        placeholder="Search"
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        className='selector'
        />
            <div>
              {filtered.map((faculty) => (
                <button
                key={faculty.abbr}
                onClick={() => 
                  setCurrent(faculty.abbr)
                }
                className={`course selector ${current === faculty.abbr ? 'selected' : ''}`}
                >
                  {faculty.name}
                </button>
              ))}
            </div>
      <footer>
      <Link href={`b/${current}`}>{current &&  <button className="footerButton">Get Started</button>}</Link>
      </footer>
    </div>
    </main>

  );
}
