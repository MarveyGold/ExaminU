import Link from "next/link";
import Logo from "./logo";
export default function Soon() {
    return(
        <div className="soon">

<header>
                            <Logo/>
                            <Link href="https://wa.me/+2349164747109"><button>Feedback</button></Link>
                        </header>
            <h1>Coming Soon...</h1>
        <Link href="/"><button className="footerButton">Home</button></Link>
    </div>
    )
}