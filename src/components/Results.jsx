import { useContext, useState } from "react";

function Results() {
  const courseScored = JSON.parse(localStorage.getItem("courseScore"));
  const [course, useCourse] = useState([courseScored] || {});

  return <div>
    {console.log(course)}
    <p>{course}</p>
  </div>;
}
export default Results;
