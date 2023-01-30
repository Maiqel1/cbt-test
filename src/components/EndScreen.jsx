import { useContext, useEffect } from "react"
import QuizContext from "../Context/QuizContext"
// import { Questions } from "../Question/QuestionBank";
import "../App.css"

function EndScreen() {

  const { score, setScore, setExamState, Questions, setTimeRemaining, setAnswers, timeAllocated, completedCourses, setCompletedCourses, selectedCourse, setCurrentQuestion } = useContext(QuizContext);
  useEffect(() => {
    if (!completedCourses.includes(selectedCourse)) {
      setCompletedCourses([...completedCourses, selectedCourse]);
    }
  }, [])
  const restartQuiz = () => {

    setTimeRemaining(timeAllocated);
    setAnswers([]);
    setScore(0);
    setExamState('menu')
  }


  return (
    <div className="EndScreen">
      <h1>Exam Finished</h1>
      <h3>{score} / {Questions.length}</h3>

      <p>{(score / Questions.length) * 100}%</p>

      <button onClick={restartQuiz}>Restart Exam</button>

    </div>
  )
}
export default EndScreen