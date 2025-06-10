'use client';
import styles from "./page.module.css";
import Logo from "./components/logo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const COS101 = () => {
    router.push('/cos101')
  }
  const STA111 = () => {
    router.push('/sta111')
  }
  const ENT211 = () => {
    router.push('/ent211')
  }
  const IFT212 = () => {
    router.push('/ift212')
  }
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
      <header>
      <Logo />
      <Link href="https://wa.me/+2349164747109">
          <button>Feedback</button>
        </Link>
      </header>

      <main className={styles.main}>
      <h3>Exam Success!!!</h3>
      <ol className={course} >
        <li>
        <button className="course selector" onClick={COS101}><h1>COS101</h1></button>
        </li>
        <li>
        <button className="course selector" onClick={STA111}><h1>STA111</h1></button>
        </li>
        <li>
        <button className="course selector"><h1>MTH101</h1> <h6>coming soon</h6></button>
        </li>
        <li>
        <button className="course selector" onClick={ENT211}><h1>ENT211</h1></button>
        </li>
        <li>
        <button className="course selector" onClick={IFT212}><h1>IFT212</h1></button>
        </li>
      </ol>
      </main>

      <footer className={styles.footer} >
      
        <button onClick={show} className={toggle} >{text}</button>
       
      </footer>
    </div>
  );
}
