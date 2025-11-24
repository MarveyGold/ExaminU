import Link from "next/link";
import styles from "@/app/styles/home.module.css"
import { COS101, STA111, IFT212 } from "@/app/components/courseList";

export default function Home() {
return (
        <main>
            <div className={styles.course}>
            <section>
                <ul>
                    <li><Link href='#1'><h3>100 Level</h3></Link></li>
                    <li><Link href='#2'><h3>200 Level</h3></Link></li>
                </ul>
            </section>
            <section className={styles.courselist}>
                <div id="1">
                    <COS101 />
                    <STA111 />
                </div>
                <div id="2">
                    <IFT212 />
                </div>
            </section>
        </div>
        </main>
    )
}
