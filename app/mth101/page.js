
'use client'
import styles from "../styles/home.module.css"
import Logo from "../components/logo"
import Link from "next/link"
import Script from "next/script"
import Button from "../components/buttons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const changeCourse = () => {
    router.push('/')
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
          <button className="footerButton" onClick={changeCourse}><h4>change course</h4></button>
        </h2>
        <Button to="/mth101/random">Random</Button>
      </main>
    </div>
  )
    }
