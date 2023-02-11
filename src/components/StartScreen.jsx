import { useContext, useEffect, useState } from "react";
import QuizContext from "../Context/QuizContext";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

function StartScreen() {
  const studentToken = JSON.parse(localStorage.getItem("authtoken"));
  const [STDtoken, setSTDToken] = useState(studentToken);

  const url = "https://cbt-mock-api.onrender.com/api/quiz/";
  const token = STDtoken;
  // console.log(STDtoken);

  const {
    examState,
    score,
    setExamState,
    courses,
    setCourses,
    selectedCourse,
    completedCourses,
    setQuestions,
    setSelectedCourse,
    setCurrentQuestion,
    timeAllocated,
    setTimeAllocated,
    timeRemaining,
    setTimeRemaining,
  } = useContext(QuizContext);

  useEffect(() => {
    setCurrentQuestion(0);
    // axios
    //   .get("https://cbt-mock-api.onrender.com/api/quiz/all")
    //   .then((response) => {
    //     setCourses(response.data);
    //   });
  }, []);

  // function fetchQuestions(CourseID) {
  //   axios
  //     .get(url + CourseID, { headers: { Authorization: token } })
  //     .then((res) => {
  //       setQuestions(res.data.splice(0, 30));
  //       setExamState("quiz");
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }

  return (
    <div className="Start ">
      <h2 className="text-center my-4">General Instructions</h2>

      <div className=" mx-auto instructions-card pb-2">
        <section className="container pt-4">
          <ul>
            <li>
              <p>Each course has 30 questions, to be attempted in 20mins.</p>
            </li>

            <li>
              <p>
                Exams are to be done one after the other; Select, attempt, and
                submit each one until you’ve attempted all 5 courses.
              </p>
            </li>

            <li>
              <p>Results will only show after all exams have been attempted.</p>
            </li>

            <li>
              <p>
                You can use the keyboard hotkeys “N” and “P” to navigate to the
                next and previous questions respectively for faster navigation.
              </p>
            </li>

            <li>
              <p>
                An exam automatically gets submitted when the time allotted has
                been exhausted.
              </p>
            </li>

            <li>
              <p>You can view your results after attempting all 5 courses.</p>
            </li>

            <li>
              <p className="fw-bold">
                For no reason should you refresh the exam page at any time (very
                important).
              </p>
            </li>
          </ul>
        </section>
      </div>

      <div className=" container d-flex justify-content-center mt-4">
        {/* {courses.map((course) => (
          <div className="mx-4" key={course.id}>
            <label htmlFor={course.quiz}>{course.quiz}</label>
            <input
              key={course.id}
              type="radio"
              id={course.name}
              value={course.id}
              checked={course.quiz   === selectedCourse}
              onChange={() => {
                setQuestions(
                  courses.find((course) => course.quiz === selectedCourse)
                    .questions
                );
                setTimeAllocated(course.duration * 60);
                setTimeRemaining(course.duration * 60);
              }}
              disabled={completedCourses.includes(course.slug)}
              className={completedCourses.includes(course.slug) ? 'disabledRadio' : ''}
            />
          </div>
        ))} */}

        {courses.map((course) => (
          <div className="mx-4" key={course.id}>
            <label htmlFor={course.quiz}>{course.quiz}</label>
            <input
              key={course.id}
              type="radio"
              id={course.name}
              value={course.id}
              checked={course.id === selectedCourse}
              onChange={() => {
                setSelectedCourse(course.id);
                setTimeAllocated(course.duration * 60);
                setTimeRemaining(course.duration * 60);
              }}
              disabled={completedCourses.includes(course.id)}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
      {completedCourses.length === 5 ? (
          <Link to="/results">
            <button className="btn btn-primary p-3 mt-5">View Results</button>
          </Link>
        ) : 
        <button
          className="btn btn-primary p-3 mt-5"
          onClick={() => {
            if (selectedCourse) {
              if (completedCourses.includes(selectedCourse)) {
                alert(
                  "You have already completed this course. Please select a different course."
                );
              } else {
                setQuestions(
                  courses
                    .find((course) => course.id === selectedCourse)
                    .questions
                    .slice(0, 30)
                    .sort(() => Math.random() - 0.5)
                );
                
                setTimeout(() => {
                  setExamState("quiz");
                }, 100);
              }
            } else {
              alert("Please select a course");
            }
          }}
        >
          Start Exam
        </button>}
      </div>

      {/* <div className="d-flex justify-content-center">
        {completedCourses.length === 5 ? (
          <Link to="/results">
            <button className="btn btn-primary p-3 mt-5">View Results</button>
          </Link>
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
                  setQuestions(
                    courses.find((course) => course.id === selectedCourse)
                      .questions
                  );
                }
              } else {
                alert("Please select a course");
              }
            }}
          >
            Start Exam
          </button>
        )}
        {completedCourses.length === 5 && <button>LOGOUT </button>}
        LOGOUT SHOULD: clear local storage,  clear completed couurses, reset scores
      </div> */}
    </div>
  );
}
export default StartScreen;
