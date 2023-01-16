import { useContext } from "react"
import { QuizContext } from "../Context/QuizContext"
import "../App.css"

function MainMenu() {

    const {examState, setExamState} = useContext(QuizContext)

  return (
    <div className="Menu">
        <button onClick={() => {
            setExamState("quiz")
        } }>Start Exam</button>
    </div>
  )
}
export default MainMenu