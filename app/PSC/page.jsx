'use client';

import Link from "next/link";

export default function Home() {
    const departmentList = ['CSC', 'STA', 'MTH'];


    return (
        <main>
            <h1>Select Your Department</h1>
            <div>
                {departmentList.map((item, index) => (
                   <Link href={`/PSC/${item}`} key={index}> <button 
                    key={index}
                    className="course selector"
                    >
                        {item}
                    </button>
                    </Link>
                )
                )}
            </div>
        </main>
    )
}