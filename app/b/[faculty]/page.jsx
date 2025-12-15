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

export default async function Home({params, searchParams}) {
    const {faculty} = await params;
    const {selected} = await searchParams;
    try {
        const faculties = data.find(f => f.code === faculty);
            const departmentList = faculties.departments.map(d => d.code) ;
 const departmentNames = faculties.departments.map(d => d.name) ;
  
           
      const facultyName = faculties.name;
         console.log(selected)
            return (
                <main>
              <div className="title">
                      <h3>{facultyName}</h3>

                   </div>     
              <h5>Select Your Department</h5>
                    <div className="list">
                        {departmentList.map((item, index) => (
                           <Link href={`/b/PSC/?selected=${item} `} key={index}> <button 
                            key={index}
                            className={`course selector ${selected == item? 'selected' : '' } `}
                            >
                                {departmentNames[index]}
                            </button>
                            </Link>
                        )
                        )}
                    </div>
                     <footer>
              {selected == 0 ?  <Link href={`/b`}><button className="footerButton">Change Faculty</button></Link>
 :  <Link href={`/b/${faculty}/${selected} `}><button className="footerButton">Get Started</button></Link>
}  
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
