import { createContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [examState, setExamState] = useState("menu");
  const [score, setScore] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);



  const [Questions, setQuestions] = useState([
    {
      course: "chm101",
      prompt: "What is 1 + 3",
      optionA: "24",
      optionB: "14",
      optionC: "2",
      optionD: "4",
      answer: "D",
    },
    {
      course: "chm101",
      prompt: "Which of these is the first element on the periodic table?",
      optionA: "hydrogen",
      optionB: "oxygen",
      optionC: "carbon",
      optionD: "magnesium",
      answer: "A",
    },
    {
      course: "chm101",
      prompt: "All life forms are made up of?",
      optionA: "metal",
      optionB: "carbon",
      optionC: "wood",
      optionD: "paper",
      answer: "B",
    },
    {
      course: "chm101",
      prompt: "Which of these is a streaming platform?",
      optionA: "twitch",
      optionB: "facebook",
      optionC: "whatsapp",
      optionD: "twitter",
      answer: "A",
    },
    {
      course: "chm101",
      prompt: "How many continents are there in the world?",
      optionA: "5",
      optionB: "7",
      optionC: "8",
      optionD: "6",
      answer: "B",
    },
    {
      course: "plb101",
      prompt: "How many continents are there in the world?",
      optionA: "5",
      optionB: "7",
      optionC: "8",
      optionD: "6",
      answer: "B",
    },
    {
      course: "plb101",
      prompt: "How many continents are there in the world?",
      optionA: "5",
      optionB: "7",
      optionC: "8",
      optionD: "6",
      answer: "B",
    },
  ]);

  const chemQuestions = Questions.filter(question => question.course === "chm101");
  const plbQuestions = Questions.filter(question => question.course === "plb101");
  const zlyQuestions = Questions.filter(question => question.course === "zly101");


  const courses = [
    {
        id: 1,
        name: "chm101",
        questions: [...chemQuestions]
    },
    {
      id: 2,
      name: "plb101",
      questions: [...plbQuestions]
  },
  {
    id: 3,
    name: "zly101",
    questions: [...zlyQuestions]
},
]

  const [timeAllocated, setTimeAllocated] = useState(30);
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
      setScore(score);
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
