import styles from "../page.module.css";
import Link from "next/link";

export default function Logo() {
    return(
        <Link href="/index.html">
            <h2 className={styles.head}>ExaminU</h2>
        </Link>
    )
}