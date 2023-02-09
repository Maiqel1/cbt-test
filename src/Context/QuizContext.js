import { createContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [Questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([])

  // console.log(courses)

  const [timeAllocated, setTimeAllocated] = useState(27 * 60);
  const [timeRemaining, setTimeRemaining] = useState(timeAllocated);

  //   this state is to clear the radio inputs when next is clicked, and retain state when previous is clicked
  const [answers, setAnswers] = useState({});

  const handleChange = (currentQuestion, optionChosen) => {
    setAnswers({ ...answers, [currentQuestion]: optionChosen });
  };

  // function to submit quiz
  const finishQuiz = (showPrompt = true) => {
    if (showPrompt) {
      if (window.confirm("Are you sure you want to submit?")) {
        let score = 0;
        for (let i = 0; i < Questions.length; i++) {
          let ans = Questions[i].option.filter(op => op.answer === true).map(an => an.option)
          if (answers[i] === undefined) {
            break;
          }
          if (ans.length > 0 && answers[i] === ans[0]) {
            score++;
          }
        }
        setScore(score);
        // This stores the scores for each course in local storage to be displayed later
        const results = JSON.parse(localStorage.getItem("results")) || {}
        results[selectedCourse] = Math.round(score / Questions.length * 100)  
        localStorage.setItem("results", JSON.stringify(results))
        setExamState("EndScreen");
      }
    } else {
      let score = 0;
      for (let i = 0; i < Questions.length; i++) {
        let ans = Questions[i].option.filter(op => op.answer === true).map(an => an.option)
        if (answers[i] === undefined) {
          break;
        }
        if (ans.length > 0 && answers[i] === ans[0]) {
          score++;
        }
      }
      setScore(score);
      const results = JSON.parse(localStorage.getItem("results")) || {}
      results[selectedCourse] = Math.round(score / Questions.length * 100)  
      localStorage.setItem("results", JSON.stringify(results))
      setExamState("EndScreen");
    }
  };


  return (
    <QuizContext.Provider
      value={{
        examState,
        setExamState,
        score,
        setScore,
        Questions,
        finishQuiz,
        answers,
        setAnswers,
        handleChange,
        timeAllocated,
        setTimeAllocated,
        timeRemaining,
        setTimeRemaining,
        courses,
        setCourses,
        selectedCourse,
        setSelectedCourse,
        completedCourses,
        setCompletedCourses,
        setQuestions,
        currentQuestion,
        setCurrentQuestion
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
