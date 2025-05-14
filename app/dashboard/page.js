import Image from "next/image";
import styles from "../page.module.css";
import Link from 'next/link';
import Logo from "../components/logo";

export default function Dashboard() {
  return (
    <div className={styles.page}>
       <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>
        <h3>GST Exam Preparation</h3>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
