import Link from "next/link";
import Logo from "@/app/components/logo";
import styles from "@/app/styles/quiz.module.css"
import { redirect } from "next/navigation";
import Form from "next/form";
import data from "@/public/data/eng.json"
export const metadata = {
  title: "Quiz",
  description: "Test Yourself with random questions",
};

export default async function Quiz({searchParams}) {
  const course = "eng";
     searchParams = await searchParams;
    const result = await searchParams?.result || "";
    

   

    const back = `/asp/`;
    const again = `/asp/courses/${course}/quiz`;
    
    try {
    const randomIndex =  searchParams?.index ? parseInt(searchParams.index, 10) : Math.floor(Math.random() * data.length);
    const quiz = data[randomIndex];
     const checkAnswer = async (formData) => {
        'use server';
        const selectedAnswer =  formData.get('quiz');
        const correctAnswer = quiz.correctAnswer;
        const result = selectedAnswer === correctAnswer ? "CORRECT!!! the answer is:" + correctAnswer : "Wrong, the answer is:" + " " + correctAnswer;
        if (selectedAnswer=== null) {
            return "The answer is" + correctAnswer
        }
        redirect(`/asp/courses/${course}/quiz?result=${encodeURIComponent(result)}&index=${randomIndex}`);
    

    }
     
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
            <code>
                {quiz.passage}
            </code> <br />
            <b>
                {quiz.instruction}
            </b>

            <div>
              {quiz.question}
            </div>

            <Form action={checkAnswer}>
            <div>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionA} 
                  />
                 A)  {quiz.optionA}
                </label>
                
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionB} 
                  />
                B)  {quiz.optionB}
                </label>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionC} 
                  />
                  C) {quiz.optionC}
                </label>
                <label className="selector">
                  <input
                    type="radio" 
                    name="quiz" 
                    value={quiz.optionD} 
                  />
                 D) {quiz.optionD}
                </label>
            </div>
            <div className="ans">
                <button type="submit"  className="answerButton">Check The Answer</button> <br />
            </div>

            </Form>

              {result && <h4>{result}</h4> }
            </main>
          
 

            
            
            
            <div className="preFooter">

            </div>
            <footer >
                <Link href={back}><button className="footerButton"><h4>Change Subject</h4></button></Link>
                <Link href={again}><button className="footerButton">Change Question</button></Link>
            </footer>

            
    </div>
 
      
    )
    } catch (error) {
      return <h1>This course is not yet available</h1>
    }
    
    // const quiz = data.find(quiz => quiz.id === random);
    
    }
    
