import Link from "next/link";
import data from "@/public/data/faculties.json"

export default async function Home({params}) {
    const {faculty} = await params;
    const present = {faculty}.faculty;
    try {
        const faculty = data.find(f => f.code === present);
            const departmentList = faculty.departments.map(d => d.code) ;
        
            return (
                <main>
                    <h1>Select Your Department</h1>
                    <div>
                        {departmentList.map((item, index) => (
                           <Link href={`/b/PSC/${item}`} key={index}> <button 
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
    } catch (error) {
        return(
        <main>
            <h3>{faculty} Not Available <b>Yet</b></h3>
            <footer>
                <Link href={`/b`}><button className="footerButton">Change Faculty</button></Link>
            </footer>
        </main>
    )
    }
    
}
