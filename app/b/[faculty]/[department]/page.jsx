import Link from "next/link";
import styles from "@/app/styles/home.module.css"
import { COS101, STA111, IFT212 } from "@/app/components/courseList";
import data from "@/public/data/faculties.json"


export default async function Home({params, searchParams}) {
  const {faculty, department} = await params;
  const {level} = await searchParams;
  const Faculty = data.find(f => f.code === faculty)
  const Departments = Faculty.departments
  const Department = Departments.find(d => d.code === department)
  const courses = Department.courses;
  console.log(courses["100level"])
return (
        <main>
            <div className={styles.course}>
            <nav>
              <Link href = "?level=100">100 Level</Link>
              <Link href = "?level=200">200 Level</Link>
            </nav>
            <section className={styles.courselist}>
                <div id="1" style={level == 200 ? {display : "none"} :  {display : "flex", flexDirection : "column"}} >
                    {courses["100level"].map((item, index) => (
                           <Link href={`/b/${faculty}/${department}/${item}/quiz`} key={index}> <button 
                            key={index}
                            className="course selector"
                            >
                                {item}
                            </button>
                            </Link>
                        )
                        )}
                </div>
                <div id="2" style={level == 200?  {display : "flex", flexDirection : "column"}:{display : "none"}}>
                    {courses["200level"].map((item, index) => (
                           <Link href={`/b/${faculty}/${department}/${item}/quiz`} key={index}> <button 
                            key={index}
                            className="course selector"
                            >
                                {item}
                            </button>
                            </Link>
                        )
                        )}
                </div>
            </section>
        </div>

        </main>
    )
}
