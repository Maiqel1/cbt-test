import { useContext } from "react"
import  QuizContext  from "../Context/QuizContext"
import "../App.css"
/* eslint-disable */
function StartScreen() {

    const {examState, setExamState} = useContext(QuizContext)

  return (
    <div className="Start ">

        <h2 className="text-center my-4">General Instructions</h2>

        <div className=" mx-auto instructions-card">
            <section className="container pt-4">
              <p className="mx-auto text-start">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              
            </section>
        </div>


        <div className="d-flex justify-content-center">
        <button className="btn btn-primary p-3 mt-5" onClick={() => {
            setExamState("quiz")
        } }>Start Exam</button>
        </div>
    </div>
  )
}
export default StartScreen