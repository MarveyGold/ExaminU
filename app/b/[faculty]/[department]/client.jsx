"use client"
import styles from "@/app/styles/home.module.css"
import Link from "next/link"
import { useState } from "react"
export default function CourseList({ faculty, department, level, courses }) {
  const [selected, setSelected] = useState()
  return (

    <section className={styles.courselist}>
      <div id="1" style={level == 200 ? { display: "none" } : { display: "flex", flexDirection: "column" }} >
        {courses["100level"].map((item, index) => (
          <button
            key={index}
            className={`course selector ${selected == item.code ? 'selected' : ''} `}
            onClick={() => {
              setSelected(item.code)
            }}
          >
            <h5>{item.name} - {item.code.toUpperCase()}</h5>
          </button>
        )
        )}
      </div>
      <div id="2" style={level == 200 ? { display: "flex", flexDirection: "column" } : { display: "none" }}>
        {courses["200level"].map((item, index) => (
          <button
            key={index}
            className={`course selector ${selected == item.code ? 'selected' : ''} `}
            onClick={() => {
              setSelected(item.code)
            }}
          >
            <h5>{item.name} - {item.code.toUpperCase()}</h5>
          </button>

        )
        )}
      </div>
      <footer>
        <Link href={`/b/${faculty}`}><button className={selected ? 'left-footerButton' : 'footerButton'}>Change Department</button></Link>
        {selected && <Link href={`/b/${faculty}/${department}/${selected}/quiz `}><button className="footerButton">Start Quiz</button></Link>
        }
      </footer>
    </section>
  )
}
