export default async function Home({params}) {
    const {faculty} = await params;
    return(
        <div>
            <h3>{faculty} Not Available <b>Yet</b></h3>
        </div>
    )
}