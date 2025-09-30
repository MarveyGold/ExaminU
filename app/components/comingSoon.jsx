import Link from "next/link";
import Logo from "./logo";
export default function Soon() {
    return(
        <div className="soon">
            <h1>Coming Soon...</h1>
        <Link href="/"><button className="footerButton">Home</button></Link>
    </div>
    )
}