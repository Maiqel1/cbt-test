import { useContext, useEffect, } from "react";
import QuizContext from "../Context/QuizContext";
import "../App.css";
import axios from "axios";
const url = "https://cbt-mock-api.onrender.com/api/quiz/"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1NjcyMjMyLCJpYXQiOjE2NzU2Njk1MzIsImp0aSI6IjQ1YzI5MDc0NDgwZjQ1YjE4Y2U5YTVmMjRlMGM4MjQxIiwidXNlcl9pZCI6MSwiZnVsbG5hbWUiOiJDYnQgQWRtaW4iLCJqYW1iX3JlZ19udW0iOiIxOC81NUVIMDAwIn0.z76Q68BxNQSQmfZCV3V0PQjxIaGpRfgt2f8feIXM8lI"
function StartScreen() {
  const {
    examState,
    setExamState,
    courses,
    selectedCourse,
    completedCourses,
    setQuestions,
    setSelectedCourse,
    setCurrentQuestion
  } = useContext(QuizContext);

  useEffect(() => {
    setCurrentQuestion(0)
  }, [])

  function fetchQuestions(courseID) {
    axios.get(url + courseID, { headers: { "Authorization": token } })
      .then((res) => {
        setQuestions(res.data)
        setExamState("quiz");
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <div className="Start ">
      <h2 className="text-center my-4">General Instructions</h2>

      <div className=" mx-auto instructions-card">
        <section className="container pt-4">
          <p className="mx-auto text-start">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </section>
      </div>

      <div className=" container d-flex justify-content-center mt-4">

        {courses.map((course) => (
          <div className="mx-4" key={course.id}>
            <label htmlFor={course.name}>{course.name}</label>
            <input
              key={course.id}
              type="radio"
              id={course.name}
              value={course.id}
              checked={course.id === selectedCourse}
              onChange={() => setSelectedCourse(course.id)}
              disabled={completedCourses.includes(course.id)}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary p-3 mt-5"
          onClick={() => {
            if (selectedCourse) {
              if (completedCourses.includes(selectedCourse)) {
                alert(
                  "You have already completed this course. Please select a different course."
                );
              } else {
                fetchQuestions(selectedCourse)
              }
            } else {
              alert("Please select a course");
            }
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}
export default StartScreen;
