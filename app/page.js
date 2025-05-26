import Button from "./components/buttons"
import styles from "./styles/home.module.css"
import Logo from "./components/logo"
import Link from "next/link"

export default function Home() {

  return (
    <div className={styles.hom}>
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
        <h2>
          Challenge your <div>knowledge</div>
        </h2>
        <Button />
      </main>
    </div>
  )
    }
