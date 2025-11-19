import Link from "next/link";
import data from "@/public/data/faculties.json"

export default function Home() {
    const faculty = data.find(f => f.code ===  "PSC");
    const departmentList = faculty.departments ;
    

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