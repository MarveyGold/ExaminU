import styles from "../page.module.css";
import Link from "next/link";

export default function Logo() {
    return(
            <h2 className={styles.head}>
                <Link href="/index.html">
                ExaminU
                </Link>
                </h2>
    )
}