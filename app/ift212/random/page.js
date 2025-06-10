import { promises as fs } from "fs";
import Link from "next/link";
import Logo from "../../components/logo";
import styles from "../../styles/quiz.module.css";
import { redirect } from "next/navigation";
import Form from "next/form";
export const metadata = {
  title: "Random",
  description: "Test Yourself with random questions",
};

export default async function Quiz({searchParams}) {
  const course = "ift212";
  const source = `${course}.json`
    const filePath = process.cwd() + `/public/data/${source}`;
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    const randomIndex =  searchParams?.index ? parseInt(searchParams.index, 10) : Math.floor(Math.random() * data.length);
    const quiz = data[randomIndex];
    // const quiz = data.find(quiz => quiz.id === random);
    const correctAnswer = quiz.correctAnswer;
    const result = searchParams?.result || "";
    

    const checkAnswer = async (formData) => {
        'use server';
        const selectedAnswer =  formData.get('quiz');
        const result = selectedAnswer === correctAnswer ? "CORRECT!!! the answer is:" + quiz.correctAnswer : "Wrong, the answer is:" + " " + quiz.correctAnswer;
        if (selectedAnswer=== null) {
            return "The answer is" + quiz.correctAnswer
        }
        redirect(`/${course}/random?result=${encodeURIComponent(result)}&index=${randomIndex}`);
    

    }

    const back = `/${course}`;
    const again = `${back}/random`;

    return(
    
     
      <div className={styles.home}>
        <header>
                <Logo/>
                <Link href="https://wa.me/+2349164747109"><button>Feedback</button></Link>
            </header>
            <main>
            <div className={styles.title}>
             {quiz.title}
            </div>

            <div>
              {quiz.question}
            </div>

            <Form action={checkAnswer}  >
            <div>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionA} 
                  />
                  {quiz.optionA}
                </label>
                
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionB} 
                  />
                  {quiz.optionB}
                </label>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionC} 
                  />
                  {quiz.optionC}
                </label>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionD} 
                  />
                  {quiz.optionD}
                </label>
            </div>
            <div className="ans">
                <button type="submit"  className="answerButton">Check The Answer</button>
            </div>

            </Form>
            </main>
          
 

            
              <h2>{result && <p>{result}</p> }</h2>
            
            
            <div>
            </div>
            <footer >
                <Link href={back}><button className="footerButton">{course}</button></Link>
                <Link href={again}><button className="footerButton">Change Question</button></Link>
            </footer>

            
    </div>
 
      
    )
    }
    
