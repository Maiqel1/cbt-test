import { useState, useContext} from "react"
import { Questions } from "../Question/QuestionBank";
import { QuizContext } from "../Context/QuizContext";

function Quiz() {
    const {score, setScore, setExamState} = useContext(QuizContext)


    const[currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("")


    const nextQuestion = () => {
        if (Questions[currentQuestion].answer === optionChosen) {
            setScore(score + 1)
        }
        // alert(score)
        // setCurrentQuestion(currentQuestion + 1)
        if (currentQuestion === Questions.length - 1) {
            setCurrentQuestion(0)
        } else {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const previousQuestion = () =>{
        if (currentQuestion === 0) {
            setCurrentQuestion(0)
        } else {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const finishQuiz = () => {
        if (Questions[currentQuestion].answer === optionChosen) {
            setScore(score + 1)
        }
        setExamState('EndScreen')
    }


  return (
    <div className="Quiz">
        <h1>{Questions[currentQuestion].prompt}</h1>

        <div className="options">
            <button onClick={() => setOptionChosen("A")}>{Questions[currentQuestion].optionA}</button>
            <button onClick={() => setOptionChosen("B")}>{Questions[currentQuestion].optionB}</button>
            <button onClick={() => setOptionChosen("C")}>{Questions[currentQuestion].optionC}</button>
            <button onClick={() => setOptionChosen("D")}>{Questions[currentQuestion].optionD}</button>
        </div>

        <div className="nextPrev">
        <button onClick={previousQuestion}>Previous Question</button>
        {currentQuestion === Questions.length - 1 ? (<button onClick={finishQuiz}>Finish Quiz</button>) : (<button onClick={nextQuestion}>Next Question</button>) }
        
        
        </div>
    </div>
  )
}
export default Quiz