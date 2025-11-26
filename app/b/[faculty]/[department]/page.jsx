import Link from "next/link";
import styles from "@/app/styles/home.module.css"
import data from "@/public/data/faculties.json"

export async function generateMetadata({params, searchParams}) {
const {faculty, department} = await params;
  const {level} = await searchParams;
  const Faculty = data.find(f => f.code === faculty)
  const Departments = Faculty.departments
  const Department = Departments.find(d => d.code === department)
  const courses = Department.courses;
  return {
    title: `${Department.name}`, 
    description: `Revise with past questions and likely exam questions of the ${level} level courses offered by the ${Department.name} under the ${Faculty.name} `,
  };


}

export default async function Home({params, searchParams}) {
  const {faculty, department} = await params;
  try {
    const {level} = await searchParams;
  const Faculty = data.find(f => f.code === faculty)
  const Departments = Faculty.departments
  const Department = Departments.find(d => d.code === department)
  const courses = Department.courses;
return (
        <main>
            <div className={styles.course}>
            <nav className={styles.nav}>
              <Link href = "?level=100"><button style={level == 200 ? {opacity: 0.5} : {opacity: 1}} className={styles.navButton}><h3>100 Level</h3></button></Link>
              <Link href = "?level=200"><button style={level == 200? {opacity: 1} : {opacity: 0.4}} className={styles.navButton}><h3>200 Level</h3></button></Link>
            </nav>
            <section className={styles.courselist}>
                <div id="1" style={level == 200 ? {display : "none"} :  {display : "flex", flexDirection : "column"}} >
                    {courses["100level"].map((item, index) => (
                           <Link href={`/b/${faculty}/${department}/${item.code}/quiz`} key={index}> <button 
                            key={index}
                            className="course selector"
                            >
                                <h5>{item.name} - {item.code.toUpperCase()}</h5>
                            </button>
                            </Link>
                        )
                        )}
                </div>
                <div id="2" style={level == 200?  {display : "flex", flexDirection : "column"}:{display : "none"}}>
                    {courses["200level"].map((item, index) => (
                           <Link href={`/b/${faculty}/${department}/${item.code}/quiz`} key={index}> <button 
                            key={index}
                            className="course selector"
                            >
                                <h5>{item.name} - {item.code.toUpperCase()}</h5>
                            </button>
                            </Link>
                        )
                        )}
                </div>
            </section>
        </div>
        <footer>
         <Link href={`/b/${faculty} `}> <button className="footerButton"><h5>Change Department</h5></button></Link>
        </footer>
        </main>
    )
  } catch (error) {
    return(
      <main>{department} not available yet</main>
    )
  }
}
