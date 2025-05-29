'use client';
import styles from '../styles/button.module.css'
import Link from "next/link";
export default function Button( { to, children } ) {
    const random = () => {
        window.location.href = to
    }
  
    return(
    <div className={styles.buttons}>
      <button className={styles.button} onClick={random}>{children}</button>
       <Link href="/exam">  <button className={styles.button}>Exam</button>  </Link>
        <Link href="/topic"> <button className={styles.button}>Topic</button>    </Link>                                              
        <Link href="/"><button className={styles.button}>Quiz</button></Link>
    </div>
    )
}
