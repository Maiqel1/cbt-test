import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./Context/QuizContext";
import Home from "./components/Home";
import QuizLanding from "./components/QuizLanding";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import Results from "./components/Results";

function App() {
  return (
    <QuizProvider>
      <Router>
      <Nav/>
        <Routes>
          <Route exact path="/" element={<Home/>}>

          </Route>
          <Route path="/register" element={<Register/>}>

          </Route>
          <Route path="/login" element={<Login/>}>

          </Route>
          <Route path="/quiz" element={<QuizLanding/>}>
            
            </Route>  
              <Route path="/results" element={<Results/>}>

              </Route>
      
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
