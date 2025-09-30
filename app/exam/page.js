'use client';
import styles from "../page.module.css";
import Logo from "../components/logo";
import Link from "next/link";
import { useState } from "react";
import { ENT211, STA111, IFT212, COS101 } from "../components/courseList";


export default function Dashboard() {

  const [course, showCourse]= useState("none");
  const [text, toggleText]= useState("Show Courses");
  const [toggle, toggleOn]= useState("courseToggleOn");
 function show() {
   showCourse((state) =>
    state==="none"? "block" : "none"
  );
  toggleText((btText) =>
  btText==="Show Courses"? "Hide Courses" : "Show Courses"
  );
    toggleOn((state) =>
    state==="courseToggle"? "courseToggleOn" : "courseToggle"
    )
 }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h3>Exam Success!!!</h3>
      <ol className={course} >
        <STA111 />
        <COS101 />
        <IFT212 />
        <ENT211 />
      </ol>
      </main>

      <footer className={styles.footer} >
      
        <button onClick={show} className={toggle} >{text}</button>
       
      </footer>
    </div>
  );
}
