import { useState, useContext, useEffect } from "react";
import QuizContext from "../Context/QuizContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ConfirmModal from "./ConfirmModal";
// import axios from "axios"

function Quiz() {
  const {
    examState,
    Questions,
    answers,
    setAnswers,
    handleChange,
    finishQuiz,
    timeRemaining,
    setTimeRemaining,
    currentQuestion,
    setCurrentQuestion,
    selectedCourse,
    showModal,
    handleClose,
    handleConfirm
  } = useContext(QuizContext);
  // setting question and answer state
  const [optionChosen, setOptionChosen] = useState("");

  // console.log(Questions, currentQuestion)

  // const [timeLeft, setTimeLeft] = useState(100);
  useEffect(() => {
    let intervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 800);
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
    // this condition returns the user to the first question when user clicks "next question" while on the last question
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

  // N and P keys for navigation
  const handleKeyDown = (event) => {
    if (event.key === "n") {
      nextQuestion();
    } else if (event.key === "p") {
      previousQuestion();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // React quill variables

  const modules = {
    toolbar: [],
  };

  const formats = ['bold', 'italic', 'underline'];

  return (
    <div className="Quiz">
      {/* <div onKeyDown={handleKeyDown} tabIndex={-1}>Helo</div> */}
      <div className="d-flex justify-content-between container my-4">
        <p>
          Question : {currentQuestion + 1} {"/"} {Questions.length}
        </p>

        <p className="text-danger">
          {Math.floor(timeRemaining / 60)} : {timeRemaining % 60}
        </p>
      </div>

      <div></div>
      <ConfirmModal showModal={showModal} onClose={handleClose} onConfirm={handleConfirm} />

      <div className="question-card container p-5">
        <section className="container mx-auto">
          {Questions[currentQuestion] && (
            // <h1 className="prompt"></h1>
            <ReactQuill
              theme="snow"
              value={Questions[currentQuestion].question}
              modules={modules}
              formats={formats}
              className="my-quill-editor  "
              readOnly
            />
          )}

          {/* FOR QUESTIONS CONTAINING LISTS */}

          {Questions[currentQuestion] && (
            <div className="lists mt-3">
              {Questions[currentQuestion].list.map((list, ind) => {
                return (
                  <div key={ind} className="d-flex mt-n5">
                    <ul>
                      <li>{list.list}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {/* FOR QUESTIONS CONTAINING DIAGRAMS */}

          {Questions[currentQuestion] && (
            <div className="lists mt-3">
              {Questions[currentQuestion].diagram.map((diagram, ind) => {
                return (
                  <div key={ind} className="d-flex mt-n5">
                    <img src={diagram.diagram} alt="" />
                  </div>
                );
              })}
            </div>
          )}

          {Questions[currentQuestion] && (
            <div className="options mt-3">
              {Questions[currentQuestion].option.map((option, ind) => {
                return (
                  <div key={ind} className="d-flex mt-n5">
                    <input
                    id={option.id}
                      className="mt-5"
                      type="radio"
                      name="option"
                      value={option.option}
                      onChange={() => {
                        setOptionChosen(option.option);
                        handleChange(currentQuestion, option.option);
                      }}
                      checked={answers[currentQuestion] === option.option}
                    />
                    <label htmlFor={option.id} className="optionsLabel">
                      <ReactQuill
                        theme="snow"
                        value={option.option}
                        modules={modules}
                        formats={formats}
                        className="my-quill-editor2"
                        readOnly
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <div className="nextPrev mt-5 d-flex justify-content-between container">
        <button
          className="btn btn-primary p-3"
          onClick={previousQuestion}
          onKeyDown={handleKeyDown}
        >
          Previous Question
        </button>

        <button
          className="btn btn-primary p-3  "
          onClick={nextQuestion}
          onKeyDown={handleKeyDown}
        >
          Next Question
        </button>
      </div>
      {/* Navigaton, blue while active, red when unanswered, green when answered */}
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
