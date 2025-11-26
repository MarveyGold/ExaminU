import Link from "next/link";
import data from "@/public/data/faculties.json"


export async function generateMetadata({params}) {
 const {faculty} = await params;
 const faculties = data.find(f => f.code === faculty);
const facultyName = faculties.name;
  return {
    title: `${facultyName}`,
  };
}

export default async function Home({params}) {
    const {faculty} = await params;
    try {
        const faculties = data.find(f => f.code === faculty);
            const departmentList = faculties.departments.map(d => d.code) ;
           
      const facultyName = faculties.name;
         console.log(facultyName)
            return (
                <main>
              <div className="title">
                      <h3>{facultyName}</h3>

                   </div>     
              <h5>Select Your Department</h5>
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
                     <footer>
                <Link href={`/b`}><button className="footerButton">Change Faculty</button></Link>
            </footer>

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
