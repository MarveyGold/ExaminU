'use client'

import { useEffect } from 'react'
import Button from "./components/buttons"
import styles from "./styles/home.module.css"
import Logo from "./components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Home() {
  const pathname = usePathname()

  useEffect(() => {
    // Only load on homepage
    if (pathname !== '/') return

    const script = document.createElement('script')
    script.src = "https://fpyf8.com/88/tag.min.js"
    script.setAttribute("data-zone", "147503")
    script.async = true
    script.setAttribute("data-cfasync", "false")
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [pathname])

  return (
    <div className={styles.hom}>
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
