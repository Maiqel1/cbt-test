import { useContext, useEffect, useState } from "react";
import QuizContext from "../Context/QuizContext";
import "../App.css";
import axios from "axios";
const url = "https://cbt-mock-api.onrender.com/api/quiz/"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1NzAzNTg4LCJpYXQiOjE2NzU3MDA4ODgsImp0aSI6IjkyZTE2YmY5ZjhlYjRhYzk5NTQ2NGNkOWU0ODc1ODVjIiwidXNlcl9pZCI6MSwiZnVsbG5hbWUiOiJDYnQgQWRtaW4iLCJqYW1iX3JlZ19udW0iOiIxOC81NUVIMDAwIn0.pcHg1ssbFMFSegV13kLqqFZoKyg1E0uGK58bXAHK-tc"
function StartScreen() {
  const {
    examState,
    setExamState,
    courses,
    setCourses,
    selectedCourse,
    completedCourses,
    setTimeAllocated,
    setQuestions,
    setSelectedCourse,
    setCurrentQuestion
  } = useContext(QuizContext);

  const [currentCourseID, setCurrentCourseID] = useState(null)

  useEffect(() => {
    setCurrentQuestion(0)

    axios.get("https://cbt-mock-api.onrender.com/api/quiz/all")
    .then(response => {
      setCourses(response.data)
    })
  }, [])

  

  function fetchQuestions(CourseID) {
    axios.get(url + CourseID, { headers: { "Authorization": token } }) 
      .then((res) => {
        setQuestions(res.data)
        // setTimeAllocated(courses.duration)
        console.log(courses.duration)
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
            <label htmlFor={course.quiz}>{course.quiz}</label>
            <input
              key={course.id}
              type="radio"
              id={course.name}
              value={course.id}
              checked={course.slug === selectedCourse}
              onChange={() => setSelectedCourse(course.slug)}
              disabled={completedCourses.includes(course.slug)}
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
                {console.log(selectedCourse)}
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
