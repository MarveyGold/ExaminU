import Logo from "./components/logo";
import Script from "next/script";
import Link from "next/link";
export default function Loading(){
  return(
    <h2>
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