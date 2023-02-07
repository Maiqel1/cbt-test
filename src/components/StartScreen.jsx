import { useContext, useEffect, useState } from "react";
import QuizContext from "../Context/QuizContext";
import "../App.css";
import axios from "axios";

function StartScreen() {
  const studentToken = JSON.parse(localStorage.getItem("authtoken"));
  const [STDtoken, setSTDToken] = useState(studentToken);

  const url = "https://cbt-mock-api.onrender.com/api/quiz/";
  const token = STDtoken;
  console.log(STDtoken);

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
    setCurrentQuestion,
  } = useContext(QuizContext);

  useEffect(() => {
    setCurrentQuestion(0);

    axios
      .get("https://cbt-mock-api.onrender.com/api/quiz/all")
      .then((response) => {
        setCourses(response.data);
      });
  }, []);

  function fetchQuestions(CourseID) {
    axios
      .get(url + CourseID, { headers: { Authorization: token } })
      .then((res) => {
        setQuestions(res.data);
        setExamState("quiz");
      })
      .catch((err) => {
        alert(err.message);
      });
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
        {completedCourses.length === 5 ? (
          <button className="btn btn-primary p-3 mt-5">View Results</button>
        ) : (
          <button
            className="btn btn-primary p-3 mt-5"
            onClick={() => {
              if (selectedCourse) {
                if (completedCourses.includes(selectedCourse)) {
                  alert(
                    "You have already completed this course. Please select a different course."
                  );
                } else {
                  fetchQuestions(selectedCourse);
                }
              } else {
                alert("Please select a course");
              }
            }}
          >
            Start Exam
          </button>
        )}
        {/* {completedCourses.length === 5 && <button>LOGOUT </button>} */}
      </div>
    </div>
  );
}
export default StartScreen;
