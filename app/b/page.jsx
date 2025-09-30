'use client';

import Link from "next/link";
import Logo from "../components/logo";

export default function Home() {
    const facultyList = ['PSC', 'LSC', 'BMS', 'ENG', 'AGR', 'DEN', 'EDU', 'ENV', 'MED', 'MGS', 'PHA', 'SPESSE', 'VNM'];


    return (
        <>
            <main>
                <h2>Select Your Faculty</h2>
                {facultyList.map((item, index) => (
                   <Link href={item} key={index}> <button 
                    key={index}
                    className="course selector"
                    >
                        {item}
                    </button>
                    </Link>
                )
                )}
            </main>
            <footer>
                            <Link href={`/`}><button className="footerButton"><h5>Change Mode</h5></button></Link>
                        </footer>
        </>
    )
}