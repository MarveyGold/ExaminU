import Link from "next/link";
import styles from '@/app/page.module.css'
export default function Home() {
   
    return (
        <div>
            <main className={styles.main}>
            <h4>Good Luck on your exams</h4>
                <Link href='/asp/courses/econs/quiz'><button className="course selector">Economics</button></Link>
                <Link href={`/asp/courses/gov/quiz`}><button className="course selector">Government</button></Link>
               <Link href={`/asp/courses/eng/quiz`}><button className="course selector">English</button></Link> 
               <Link href={`/asp/courses/bio/quiz`}><button className="course selector">Biology</button></Link> 
               <Link href={`/asp/courses/phy/quiz`}><button className="course selector">Physics</button></Link> 
               <Link href={`/asp/courses/chem/quiz`}><button className="course selector">Chemistry</button></Link> 
            </main>
              
            <footer>
                <Link href={`/app`}><button className="footerButton"><h5>Change Mode</h5></button></Link>
            </footer>
        </div>
    )
}