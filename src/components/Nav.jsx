  import {useContext, useState} from 'react'
  import QuizContext from "../Context/QuizContext"

  function Nav() {
    const studentData = JSON.parse(localStorage.getItem('student'))
    const [student, setStudent] = useState(studentData || {})    


    const {timeAllocated, timeRemaining, finishQuiz} = useContext(QuizContext)

    return (
      <div className="navBar">
          <div className="d-flex justify-content-between container pt-2">
            {student.fullname}
            
            {timeRemaining <= timeAllocated / 4 && (<p onClick={finishQuiz} className="submit-button"> SUBMIT</p>)}
          </div>
      </div>
    )
  }
  export default Nav