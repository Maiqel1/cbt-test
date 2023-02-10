import { useContext, useEffect } from "react";
import QuizContext from "../Context/QuizContext";
// import { Questions } from "../Question/QuestionBank";
import "../App.css";

function EndScreen() {
  const {
    score,
    setScore,
    setExamState,
    Questions,
    setTimeRemaining,
    setAnswers,
    timeAllocated,
    completedCourses,
    setCompletedCourses,
    selectedCourse,
    setCurrentQuestion,
  } = useContext(QuizContext);
  useEffect(() => {
    if (!completedCourses.includes(selectedCourse)) {
      setCompletedCourses([...completedCourses, selectedCourse]);
    }
  }, []);
  const restartQuiz = () => {
    setTimeRemaining(timeAllocated);
    setAnswers([]);
    setScore(0);
    setExamState("menu");
  };

  return (
    <div className="EndScreen mt-5 pt-5">
      <div className="mx-auto text-center  endscreen-card">
        <h4 className="pt-5">Exam submitted Successfully</h4>
        <h4 className="pt-5">Go to the next course to proceed with your exam</h4>
        <h4 className="pb-5">Proceed to next course?</h4>
        <button onClick={restartQuiz} className="btn text-white p-3">Go to next course</button>
      </div>
    </div>
  );
}
export default EndScreen;
