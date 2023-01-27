import {useContext} from 'react'
import QuizContext from "../Context/QuizContext"

function Nav() {

  const {timeAllocated, timeRemaining, finishQuiz} = useContext(QuizContext)

  return (
    <div className="navBar">
        <div className="d-flex justify-content-between container pt-2">
          <p>Name</p>
          {/* timeRemaining <= timeAllocated / 2 && (
          <button onClick={finishQuiz}>Submit</button> */}
          {timeRemaining <= timeAllocated /2 && (<p onClick={finishQuiz} className="submit-button"> SUBMIT</p>)}
        </div>
    </div>
  )
}
export default Nav