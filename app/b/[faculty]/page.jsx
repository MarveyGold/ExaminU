import Link from "next/link";


// export async function generateMetadata({ params }) {
//const { faculty } = await params;
// const faculties = data.find(f => f.code === faculty);
//  const facultyName = faculties.name;
// return {
//  title: `${facultyName}`,
// };
//}

export default async function Home({ params, searchParams }) {
  const { faculty } = await params;
  const { selected } = await searchParams;
  const prodApi = "https://examinu-api.up.railway.app"
  const devApi = "http://127.0.0.1:8080";
  const faculties = await fetch(`${devApi}/api/${faculty}/name`);
  const facultyName = await faculties.text();
  try {
    const names = await fetch(`${devApi}/api/${faculty}/departments/names`);
    const links = await fetch(`${devApi}/api/${faculty}/departments/codes`);
    const departmentList = await links.json();
    const departmentNames = await names.json();


    return (
      <main>
        <div className="title">
          <h3>{facultyName}</h3>

        </div>
        <h5>Select Your Department</h5>
        <div className="list">
          {departmentList.map((item, index) => (
            <Link href={`/b/${faculty}/?selected=${item} `} key={index}> <button
              key={index}
              className={`course selector ${selected == item ? 'selected' : ''} `}
            >
              {departmentNames[index]}
            </button>
            </Link>
          )
          )}
        </div>
        <footer>
          {selected == 0 ? <Link href={`/b`}><button className="footerButton">Change Faculty</button></Link>
            : <Link href={`/b/${faculty}/${selected} `}><button className="footerButton">Get Started</button></Link>
          }
        </footer>

      </main>
    )
  } catch (error) {
    return (
      <main>
        <h2>{facultyName} is not available yet</h2>      </main>

    )
  }
}
