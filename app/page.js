'use client';
import { Analytics } from "@vercel/analytics/next"
import Button from "./components/buttons";
import styles  from "./styles/home.module.css";
import Logo from "./components/logo";
import Link from "next/link";
export default function Home(){

  return(
    <div className={styles.hom}>

    <header>
      <Logo />
      <Link href="https://wa.me/+2349164747109"><button>Feedback</button></Link>
    </header>
    <main className={styles.main} >
      <h2>
        Challenge your <div>knowledge</div>
      </h2>
      <Button />
    </main>
    </div>
  )
}