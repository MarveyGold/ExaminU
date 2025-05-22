import { promises as fs } from "fs";
import Link from "next/link";
import Logo from "../components/logo";
import styles from "../styles/quiz.module.css";
import { redirect } from "next/navigation";
import Script from "next/script";
export const metadata = {
  title: "Random",
  description: "Test Yourself with random questions",
  course: "COS101",
};

export default async function Quiz({searchParams}) {
    const filePath = process.cwd() + '/public/data/questions.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    const randomIndex =  searchParams?.index ? parseInt(searchParams.index, 10) : Math.floor(Math.random() * data.length);
    const quiz = data[randomIndex];
    // const quiz = data.find(quiz => quiz.id === random);
    const correctAnswer = quiz.correctAnswer;
    const result = searchParams?.result || "";
   // console.log(searchParams?.result);
    

    const checkAnswer = async (formData) => {
        'use server';
        const selectedAnswer =  formData.get('quiz');
        const result = selectedAnswer === correctAnswer ? "CORRECT!!! the answer is:" + quiz.correctAnswer : "Wrong, the answer is:" + " " + quiz.correctAnswer;
        if (selectedAnswer=== null) {
            return "The answer is" + quiz.correctAnswer
        }
        redirect(`/random?result=${encodeURIComponent(result)}&index=${randomIndex}`);
    

    }

    return(
     <Link href = 'https://otieu.com/4/9333331'>  
      <Script
  id="ad-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(d, z, s) {
        s.src = 'https://' + d + '/401/' + z;
        try {
          (document.body || document.documentElement).appendChild(s);
        } catch (e) {}
      })('gizokraijaw.net', 9365928, document.createElement('script'));
    `,
  }}
/>
      <div className={styles.home}>
      

            <header>
                <Logo/>
                <Link href="https://wa.me/+2349164747109"><button>Feedback</button></Link>
            </header>
            <div className={styles.title}>
             {quiz.title}
            </div>

            <div>
              {quiz.question}
            </div>

            <form action={checkAnswer}  >
            <div>
                <div className="selector">
                    <input type="radio" name="quiz" value={quiz.optionA} />
                    <label htmlFor="quiz">{quiz.optionA}</label>
                </div>
                <div className="selector">
                    <input type="radio" name="quiz" id="" value={quiz.optionB}  />
                    <label htmlFor="quiz">{quiz.optionB}</label>
                </div>
                <div className="selector">
                    <input type="radio" name="quiz" id="" value={quiz.optionC} />
                    <label htmlFor="quiz">{quiz.optionC}</label>
                </div>
                <div className="selector">
                    <input type="radio" name="quiz" id="" value={quiz.optionD}/>
                    <label htmlFor="quiz">{quiz.optionD}</label>
                </div>
            </div>
            <div className="ans">
                <button type="submit"  className="answerButton">Check The Answer</button>
            </div>

            </form>
          
 

            <h2>{result && <p>{result}</p> }</h2>
            
            
            <div>
            </div>
            <footer className={styles.footer}>
                <Link href="/"><button className="footerButton">Home</button></Link>
                <Link href="/random"><button className="footerButton">Next</button></Link>
            </footer>
            
    </div>
  
      
      </Link>
    )
    }
    
