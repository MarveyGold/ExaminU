import Link from "next/link";
export default async function Home({params}) {
    const {faculty} = await params;
    return(
        <div>
            <h3>{faculty} Not Available <b>Yet</b></h3>
            <footer>
                <Link href={`/`}><button className="footerButton">Go home</button></Link>
            </footer>
        </div>
    )
}