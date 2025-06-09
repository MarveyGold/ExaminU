'use client';
import styles from '../styles/button.module.css'
import Link from "next/link";
export default function Button(  ) {
  
  
    return(
        <>
    <div className={styles.buttons}>
      
       <Link href="/exam">  <button className={styles.button}>Course Materials</button>  </Link>
        <Link href="/topic"> <button className={styles.button}>Topic</button>    </Link> 
        
    </div>
    <footer>
       </footer>
        
    </>
    )
}
