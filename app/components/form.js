
export default function Form() {
    return(
        <form>
        <div>
            <div className="selector">
                <input type="radio" name="quiz"  />
                <label htmlFor="quiz">{quiz.optionA}</label>
            </div>
            <div className="selector">
                <input type="radio" name="quiz" id="" />
                <label htmlFor="quiz">{quiz.optionB}</label>
            </div>
            <div className="selector">
                <input type="radio" name="quiz" id="" />
                <label htmlFor="quiz">{quiz.optionC}</label>
            </div>
            <div className="selector">
                <input type="radio" name="quiz" id="" />
                <label htmlFor="quiz">{quiz.optionD}</label>
            </div>
        </div>
        <div>
            <input type="button" value="Check The Answer" />
        </div>

        </form>
    )
}