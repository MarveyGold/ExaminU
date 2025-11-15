
import Link from "next/link";

export default function Logo() {
    return(
        <Link href="/">
        <header className="header">
                <img className="uniben" src="/favicon.png" alt="examinu" />
                <div className="logo">ExaminU</div>
                
              </header>  
        </Link>
    )
}