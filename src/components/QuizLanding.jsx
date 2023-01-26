/* eslint-disable */

import { useContext } from "react"
import QuizContext from "../Context/QuizContext"
import StartScreen from "./StartScreen";
import Quiz from "./Quiz";
import EndScreen from "./EndScreen";
// import "./App.css";


function QuizLanding() {

    const {examState, setExamState} = useContext(QuizContext)
  return (
    <div>

        {examState === "menu" && <StartScreen/>}
    {examState === "quiz" && <Quiz/>}
    {examState === "EndScreen" && <EndScreen/>} 
    </div>
  )
}
export default QuizLanding