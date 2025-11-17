"use client";
import { useState } from "react";
import styles from "../styles/button.module.css";
import Link from "next/link";

export default function Faculty() {
  const facultyList = ['PSC', 'LSC', 'BMS', 'ENG', 'AGR', 'DEN', 'EDU', 'ENV', 'MED', 'MGS', 'PHA', 'SPESSE', 'VNM'];
  const faculties = ['Faculty of Physical  Sciences', 'Faculty of Life Sciences', 'Faculty of Basic Medical Sciences', 'Faculty of Engineering', 'Faculty of Agriculture', 'Faculty of Dentistry', 'Faculty of Education', 'Faculty of Environmental Sciences', 'Faculty of Medicine', 'Faculty of Management Science', 'Faculty of Pharmacy','SPESSE', 'Faculty of Veterinary Medicine and Animal Science'];
  const [current, setCurrent] = useState("");
  const [search, setSearch] = useState("");
  const filtered = faculties
    .map((f, i) => ({ name: f, abbr: facultyList[i] }))
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <main className="main">    
      <h4>Select Faculty</h4><div className={styles.container}>
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
      <Link href={current}> <button className="footerButton">Get Started</button></Link>
      </footer>
    </div>
    </main>

  );
}
