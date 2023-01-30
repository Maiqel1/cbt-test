
import { useState, useContext, useEffect } from "react";
import QuizContext from "../Context/QuizContext";

function Quiz() {
  const {
    examState,
    Questions,
    answers,
    setAnswers,
    handleChange,
    finishQuiz,
    timeAllocated,
    timeRemaining,
    setTimeRemaining,
    currentQuestion,
    setCurrentQuestion
  } = useContext(QuizContext);
  // setting question and answer state
  const [optionChosen, setOptionChosen] = useState("");

  // const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(0);
      finishQuiz(false);
    }
  }, [timeRemaining]);

  // function for navigation
  const handleNavigation = (question) => {
    setCurrentQuestion(question - 1);
  };

  //   next question and score increment
  const nextQuestion = () => {
    // this condition returns the user to the first question when he clicks "next question" while on the last question
    if (currentQuestion === Questions.length - 1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setAnswers({ ...answers });
  };

  // navigation to previous questions
  const previousQuestion = () => {
    if (currentQuestion === 0) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
    // const prevAnswer = answers[currentQuestion - 1];
  };

  return (
    <div className="Quiz">
      <div className="d-flex justify-content-between container my-4">
        <p>
          Question : {currentQuestion + 1} {"/"} {Questions.length}
        </p>

        <p className="text-danger">
          {Math.floor(timeRemaining / 60)} : {timeRemaining % 60}
        </p>
      </div>

      <div></div>

      <div className="question-card container p-5">
        <section className="container mx-auto">
          {Questions[currentQuestion] && (
            <h1 className="prompt">{Questions[currentQuestion].prompt}</h1>
          )}
          {console.log(Questions)}

          {Questions[currentQuestion] && (
            <div className="options mt-3">
              <div>
                <input
                  type="radio"
                  name="option"
                  value="A"
                  onChange={() => {
                    setOptionChosen("A");
                    handleChange(currentQuestion, "A");
                  }}
                  checked={answers[currentQuestion] === "A"}
                />
                <label htmlFor="optionA">
                  {Questions[currentQuestion].optionA}
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="optionB"
                  name="option"
                  value="B"
                  onChange={() => {
                    setOptionChosen("B");
                    handleChange(currentQuestion, "B");
                  }}
                  checked={answers[currentQuestion] === "B"}
                />
                <label htmlFor="optionB">
                  {Questions[currentQuestion].optionB}
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="optionC"
                  name="option"
                  value="C"
                  onChange={() => {
                    setOptionChosen("C");
                    handleChange(currentQuestion, "C");
                  }}
                  checked={answers[currentQuestion] === "C"}
                />
                <label htmlFor="optionC">
                  {Questions[currentQuestion].optionC}
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="optionD"
                  name="option"
                  value="D"
                  onChange={() => {
                    setOptionChosen("D");
                    handleChange(currentQuestion, "D");
                  }}
                  checked={answers[currentQuestion] === "D"}
                />
                <label htmlFor="optionD">
                  {Questions[currentQuestion].optionD}
                </label>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="nextPrev mt-5 d-flex justify-content-between container">
        <button className="btn btn-primary p-3" onClick={previousQuestion}>
          Previous Question
        </button>

        <button className="btn btn-primary p-3  " onClick={nextQuestion}>
          Next Question
        </button>
      </div>

      <div className="container">
        {Array.from({ length: Questions.length }, (_, i) => (
          <div
            key={i + 1}
            onClick={() => handleNavigation(i + 1)}
            className={
              i === currentQuestion
                ? "active-question"
                : answers[i]
                ? "question-navigation"
                : "question-navigation2"
            }
          >
            <p className="mt-3 ms-4 text-white">{i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Quiz;
