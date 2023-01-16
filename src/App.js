import "./App.css"
import { useState , useContext } from "react";
import MainMenu from "./components/MainMenu";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";

import { QuizContext } from "./Context/QuizContext";

function App() {

  const [examState, setExamState] = useState("menu")
  const [score, setScore] = useState(0)
  
  return (
    <div className="App">
      <h1>Quiz App</h1>

    <QuizContext.Provider
     value={{
      examState,
       setExamState,
       score,
       setScore,
      }}>
    {examState === "menu" && <MainMenu/>}
    {examState === "quiz" && <Quiz/>}
    {examState === "EndScreen" && <EndScreen/>}
    </QuizContext.Provider>
    </div>
      )
}

export default App;
