import { createContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);

  const Questions = [
    {
      prompt: "What is 1 + 3",
      optionA: "24",
      optionB: "14",
      optionC: "2",
      optionD: "4",
      answer: "D",
    },
    {
      prompt: "Which of these is the first element on the periodic table?",
      optionA: "hydrogen",
      optionB: "oxygen",
      optionC: "carbon",
      optionD: "magnesium",
      answer: "A",
    },
    {
      prompt: "All life forms are made up of?",
      optionA: "metal",
      optionB: "carbon",
      optionC: "wood",
      optionD: "paper",
      answer: "B",
    },
    {
      prompt: "Which of these is a streaming platform?",
      optionA: "twitch",
      optionB: "facebook",
      optionC: "whatsapp",
      optionD: "twitter",
      answer: "A",
    },
  ];


  //   this state is to clear the radio inputs when next is clicked, and retain state when previous is clicked
  const [answers, setAnswers] = useState({});

  const handleChange = (currentQuestion, optionChosen) => {
    setAnswers({ ...answers, [currentQuestion]: optionChosen });
  };

  // function for navigtion

// function to submit quiz
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
        let score = 0;
        for (let i = 0; i < Questions.length; i++) {
          if (answers[i] === Questions[i].answer) {
            score++;
          }
        }
        setScore(score)
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

      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
