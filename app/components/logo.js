
import Link from "next/link";

export default function Logo() {
    return(
        
        <header>
            <Link href="/">
                <img className="uniben" src="/favicon.png" alt="examinu" />
                <div className="logo">ExaminU</div>
                </Link>
              </header>  
       
    )
}