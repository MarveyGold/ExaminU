'use client';
import styles from "./page.module.css";
import Logo from "./components/logo";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const COS101 = () => {
    router.push('/cos101')
  }
  const STA111 = () => {
    router.push('/sta111')
  }
  const ENT211 = () => {
    router.push('/ent211')
  }
  return (
    <div className={styles.page}>
        <Script
        src="https://fpyf8.com/88/tag.min.js"
        data-zone="147503"
        data-cfasync="false"
        strategy="afterInteractive"
      />
      <header>
      <Logo />
      <Link href="https://wa.me/+2349164747109">
          <button>Feedback</button>
        </Link>
      </header>

      <main className={styles.main}>
      <h3>Exam Success!!!</h3>
      <ol>
        <li>
        <button className="course selector" onClick={COS101}><h1>COS101</h1></button>
        </li>
        <li>
        <button className="course selector" onClick={STA111}><h1>STA111</h1></button>
        </li>
        <li>
        <button className="course selector"><h1>MTH101</h1> <h6>coming soon</h6></button>
        </li>
        <li>
        <button className="course selector" onClick={ENT211}><h1>ENT211</h1></button>
        </li>
      </ol>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
