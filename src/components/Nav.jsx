import { useContext, useState, useEffect } from "react";
import QuizContext from "../Context/QuizContext";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  let location = useLocation();
  let navigate = useNavigate();

  const studentData = JSON.parse(localStorage.getItem("student"));
  const [student, setStudent] = useState(studentData || {});

  const logOut = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("student");
    localStorage.removeItem("results");

    navigate("/login");
    window.location.reload(false);
  };

      

  const { timeAllocated, timeRemaining, handleFinish, completedCourses } =
    useContext(QuizContext);

  return (
    <div className="navBar">
      <div className="d-flex justify-content-between container pt-2">
        {student.fullname}

        {timeRemaining <= timeAllocated / 1.3 &&
        location.pathname === "/quiz" ? (
          <button onClick={handleFinish} className="submit-button">
            SUBMIT
          </button>
        ) : location.pathname === "/results" ||
          completedCourses.length === 5 ? (
          <button onClick={logOut} className="logout-button">
            LOGOUT
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
export default Nav;
