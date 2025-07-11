import Link from "next/link";
import Logo from "./components/logo";
import styles from '@/app/page.module.css'
export default function Home(params) {
    return (
        <>
        <Logo />
        <main className={styles.main}>
        <h3>Select Mode</h3>
       <Link href='/asp'><button className="course selector">Aspirant</button></Link>
        <Link href='/b'><button className="course selector">Student</button></Link>
        </main>
        </>
    )
}