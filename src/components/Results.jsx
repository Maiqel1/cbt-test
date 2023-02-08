import Trophy from "../assets/img/trophy.png";
import { useContext, useEffect, useState } from "react";

function Results() {
  const [results, setResults] = useState({});
  const [average, setAverage] = useState(0);

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("results")) || {});
  }, []);

  useEffect(() => {
    if (Object.values(results).length === 0) {
      return;
    }

    const sum = Object.values(results).reduce((acc, curr) => acc + curr, 0);
    setAverage(sum / Object.values(results).length);
  }, [results]);

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div className="results-header">
          <h3 className="text-white text-center mt-4">Exams Completed</h3>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div className="results-header2">
          <h4 className=" text-center mt-4">Overall Score</h4>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="results-card">
          
              <h4 className=" text-center mt-4">Your Score</h4>
          
          <div className="text-center ">
          <img src={Trophy} alt="" />
            <h2 className={average <= 50 ? "text-danger" : "text-success"}>
              {average.toFixed(2)}%
            </h2>
          </div>

          <section>
          {Object.entries(results).map((entry) => {
        return (
            <div className="d-inline-block ms-5">
            
            <p>{entry[0]}</p>
            <p className={entry[1] <= 50 ? "text-danger" : "text-success"}>
              {entry[1]}%
            </p>
            </div>
        );
      })}


          </section>
          
        </div>
      </div>

        {/* {Object.entries(results).map((entry) => {
          return (
            <div style={{ display: "flex" }}>
              <p>{entry[0]}</p>:
              <p className={entry[1] <= 50 ? "text-danger" : "text-success"}>
                {entry[1]}%
              </p>
            </div>
          );
        })}
        <div style={{ display: "flex" }}>
          <p>Average</p>:
          <p className={average <= 50 ? "text-danger" : "text-success"}>
            {average.toFixed(2)}%
          </p>
        </div> */}
    </div>
  );
}
export default Results;
