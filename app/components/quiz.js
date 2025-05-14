import { promises as fs } from "fs";
import Link from "next/link";

export default async function Quiz() {
    const filePath = process.cwd() + '/public/data/questions.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    const quiz = data.find(quiz => quiz.id === 2)

    return(
        <div>
            <header>

            </header>
            <div>
             <p>{quiz.title}</p>
            </div>

            <div>
              <p>{quiz.question} </p>
            </div>

            <form>
            <div>
                    {quiz.options}
            </div>
            <div>
                <input type="button" value="Check The Answer" />
            </div>

            </form>
            <div>
                <Link href="/"><button>Home</button></Link>
            </div>

    </div>

    )
}