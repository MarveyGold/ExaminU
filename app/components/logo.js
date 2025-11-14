
import Link from "next/link";

export default function Logo() {
    return(
        <Link href="/">
        <header className="header">
                <img className="uniben" src="favicon.ico" alt="examinu" />
                <div className="logo">ExaminU</div>
                
              </header>  
        </Link>
    )
}