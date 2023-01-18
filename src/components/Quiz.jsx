import { useState, useContext, useEffect } from "react";
import { Questions } from "../Question/QuestionBank";
import { QuizContext } from "../Context/QuizContext";

function Quiz() {
  const { score, setScore, setExamState } = useContext(QuizContext);

  // setting question and answer state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  //   setting timer state
  // const [timeLeft, setTimeLeft] = useState(100);
  const timeAllocated = 10;
  const [timeRemaining, setTimeRemaining] = useState(timeAllocated);

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

  //   this state is to clear the radio inputs when next is clicked, and retain state when previous is clicked
  const [answers, setAnswers] = useState({});

  const handleChange = (currentQuestion, optionChosen) => {
    setAnswers({ ...answers, [currentQuestion]: optionChosen });
  };

  //   next question and score increment
  const nextQuestion = () => {
    // theres a flaw here, score increments once answer is picked, and doesnt reduce when answer is changed to incorrect one.
    // possible fix? disable previous question button(not very feasible)
    // alternatively,move score increment to finish quiz function
    // if (Questions[currentQuestion].answer === optionChosen) {
    //   setScore(score + 1);
    // }
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

  //   code to submit quiz, needs work
  //   const finishQuiz = () => {
  //     // if (Questions[currentQuestion].answer === optionChosen) {
  //     //   setScore(score + 1);
  //     // }

  //     setExamState("EndScreen");
  //   };

  // setting timer state

  //   const finishQuiz = () => {
  //     if (window.confirm("Are you sure you want to submit?")) {
  //       let score = 0;
  //       for (let i = 0; i < Questions.length; i++) {
  //         if (answers[i] === Questions[i].answer) {
  //           score++;
  //         }
  //       }
  //       setScore(score);
  //       setExamState("EndScreen");
  //     }
  //   };

  const finishQuiz = (showPrompt = true) => {
    if (showPrompt) {
      if (window.confirm("Are you sure you want to submit?")) {
        let score = 0;
        for (let i = 0; i < Questions.length; i++) {
          if (answers[i] === Questions[i].answer) {
            score++;
          }
        }
        setScore(score);
        setExamState("EndScreen");
      }
    } else {
      setExamState("EndScreen");
    }
  };

  return (
    <div className="Quiz">
      <h1>
        Time Left: {Math.floor(timeRemaining / 60)} : {timeRemaining % 60}
      </h1>

      <div>
        {timeRemaining <= timeAllocated / 2 && (
          <button onClick={finishQuiz}>Finish Quiz</button>
        )}
      </div>

      <h1>{Questions[currentQuestion].prompt}</h1>

      <div className="options">
        {/* <button onClick={() => setOptionChosen("A")}>{Questions[currentQuestion].optionA}</button>
            <button onClick={() => setOptionChosen("B")}>{Questions[currentQuestion].optionB}</button>
            <button onClick={() => setOptionChosen("C")}>{Questions[currentQuestion].optionC}</button>
            <button onClick={() => setOptionChosen("D")}>{Questions[currentQuestion].optionD}</button> */}
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
          <label htmlFor="optionA">{Questions[currentQuestion].optionA}</label>
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
          <label htmlFor="optionB">{Questions[currentQuestion].optionB}</label>
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
          <label htmlFor="optionC">{Questions[currentQuestion].optionC}</label>
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
          <label htmlFor="optionD">{Questions[currentQuestion].optionD}</label>
        </div>
      </div>

      <div className="nextPrev">
        <button onClick={previousQuestion}>Previous Question</button>

        <button onClick={nextQuestion}>Next Question</button>
      </div>
    </div>
  );
}
export default Quiz;
