import { useContext, useEffect, useState } from "react";

function Results() {
  const [results, setResults] = useState({})

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("results")) || {})
  }, [])

  return (
    <div>
      {
        Object.entries(results).map((entry) => {
          return (
            <div style={{ display: "flex" }}>
              <p>{entry[0]}</p>
              :
              <p>{entry[1]}</p>
            </div>
          )
        })
      }
    </div>
  )
}
export default Results;
