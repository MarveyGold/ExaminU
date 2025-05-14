import Loading from '../loading';
import Link from "next/link";
export default function Topic() {
    return(
        <div>

        <Loading/>
        <Link href="/"><button>Home</button></Link>
    </div>
    )
}