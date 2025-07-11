'use client';

import Link from "next/link";

export default function Home() {
    const facultyList = ['PSC', 'LSC', 'BMS', 'ENG', 'AGR', 'DEN', 'EDU', 'ENV', 'MED', 'MGS', 'PHA', 'SPESSE', 'VNM'];


    return (
        <>
            <h1>Select Your Faculty</h1>
            <div>
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
            </div>
            <footer>
                            <Link href={`/`}><button className="footerButton"><h5>Change Mode</h5></button></Link>
                        </footer>
        </>
    )
}