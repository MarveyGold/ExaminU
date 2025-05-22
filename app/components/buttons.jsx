'use client';
import styles from '../styles/button.module.css'
import Link from "next/link";
export default function Button() {

  
    return(
    <div className={styles.buttons}>
       <Link href="/random"><button className={styles.button}>Random</button></Link>
       <Link href="/exam">  <button className={styles.button}>Exam</button>  </Link>
        <Link href="/topic"> <button className={styles.button}>Topic</button>    </Link>                                              
        <Link href="/"><button className={styles.button}>Quiz</button></Link>
    </div>
    )
}
