'use client'
import styles from "../../../../styles/home.module.css"
import Logo from "../../../../components/logo"
import Link from "next/link"
import Button from "../../../../components/buttons";
import { useRouter } from "next/navigation";
import React from "react";
export default  function Home({params}) {
  const {course} =  React.use(params);
  const router = useRouter();
  const changeCourse = () => {
    router.push('/b')
  }
    const random = () => {
        router.push(`/courses/${course}/quiz`)
          
      }
      const title = course.toUpperCase();
  return (
    <div className={styles.hom}>
      <main className={styles.main}>
        <h2>
          Challenge your <div>knowledge</div>
          
        </h2>
        <h3>{title}</h3>
      </main>
      <footer>
        <button className="answerButton " onClick={changeCourse}><h4>change course</h4></button>
         <button className="answerButton" onClick={random}>Start Quiz</button>
    
      </footer>
    </div>
  )
    }
