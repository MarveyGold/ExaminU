import Logo from "./components/logo";
import Script from "next/script";
import Link from "next/link";
export default function Loading(){
  return(
    <h2>
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
      ...
    </h2>
  )
}