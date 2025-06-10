'use client'
import styles from "../styles/home.module.css"
import Logo from "../components/logo"
import Link from "next/link"
import Button from "../components/buttons";
import { useRouter } from "next/navigation";

export default function Home() {
  const course = "sta111"
  const router = useRouter();
  const changeCourse = () => {
    router.push('/')
  }
    const random = () => {
        router.push(`/${course}/random`)
          
      }

  return (
    <div className={styles.hom}>
      <header>
        <Logo />
        <Link href="https://wa.me/+2349164747109">
          <button>Feedback</button>
        </Link>
      </header>

      <main className={styles.main}>
        <h2>
          Challenge your <div>knowledge</div>
          
        </h2>
        <h3>{course}</h3>
        <Button />
      </main>
      <footer>
        <button className="footerButton left" onClick={changeCourse}><h4>change course</h4></button>
         <button className="answerButton" onClick={random}>Start Quiz</button>
    
      </footer>
    </div>
  )
    }
