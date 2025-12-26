"use client";
import { useState } from "react";
import styles from "../styles/button.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Faculty({ names, codes }) {
  const [current, setCurrent] = useState();
  const [search, setSearch] = useState("");
  const filtered = names
    .map((f, i) => ({ name: f, abbr: codes[i] }))
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className={styles.container}>
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
        <Link href={`b/${current}`}>{current && <button className="footerButton">Get Started</button>}</Link>
      </footer>
    </div>
  );
}
