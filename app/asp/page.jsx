import Logo from "../components/logo";
import Link from "next/link";
import styles from '@/app/page.module.css'
export default function Home() {
   
    return (
        <div>
            <Logo />
            <main className={styles.main}>
            <h4>Good Luck on your exams</h4>
                <Link href='/asp/courses/econs/quiz'><button className="course selector">Economics</button></Link>
                <Link href={`/asp/courses/gov/quiz`}><button className="course selector">Government</button></Link>
               <Link href={`/asp/courses/eng/quiz`}><button className="course selector">English</button></Link> 
               <Link href={`/asp/courses/bio/quiz`}><button className="course selector">Biology</button></Link> 
            </main>
              <div id="preFooter">

            </div>
            <footer>
                <Link href={`/`}><button className="footerButton"><h5>Change Mode</h5></button></Link>
            </footer>
        </div>
    )
}