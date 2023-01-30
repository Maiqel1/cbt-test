import { useContext, } from "react";
import QuizContext from "../Context/QuizContext";
import "../App.css";

function StartScreen() {
  const {
    examState,
    setExamState,
    courses,
    selectedCourse,
    completedCourses,
    setQuestions,
    setSelectedCourse,
  } = useContext(QuizContext);

  console.log(selectedCourse)

  //   const selectedCourseData = courses.find((course) => course.id === selectedCourse);
  // if (selectedCourseData) {
  //   setQuestions(selectedCourseData.questions);
  // } else {
  //   console.error("Selected course not found in courses list.");
  // }


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

      <div className=" container d-flex justify-content-center">

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

                setQuestions(
                  courses.find((course) => course.id === selectedCourse)
                    .questions
                );
                setTimeout(() => {
                  setExamState("quiz");
                }, 100)
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
