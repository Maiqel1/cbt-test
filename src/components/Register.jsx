import { useState, useEffect } from "react";

function Register() {
  const [regData, setRegData] = useState({
    fullname: "",
    jamb_reg_num: "",
    generated_password: "",
    password: "",
  });

  const [isReady, setIsReady] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [registrationErrors, setRegistrationErrors] = useState(null);

  // program to generate random strings

  function generatePassword(fullname, jambnum) {
    const baseChars = fullname.replaceAll(" ", "") + jambnum;
    let result = " ";
    const charactersLength = baseChars.length;
    for (let i = 0; i < 7; i++) {
      result += baseChars.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const handleChange = (e) => {
    setRegData({
      ...regData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      const genPass = generatePassword(regData.fullname, regData.jamb_reg_num);

      setRegData({
        ...regData,
        generated_password: genPass,
        password: genPass,
      });

      if (regData.password) {
        setIsReady(true);
      }
    }, 300);
  };

  useEffect(() => {
    if (regData.password && isReady === true) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(regData),
        };

        fetch("https://cbt-mock-api.onrender.com/api/users/register/", options)
          .then((res) => res.json())
          .then((resData) => {
            if (resData.message) {
              setRegistrationErrors(null);
              setIsReady(false);

              setRegistrationSuccess(resData.message);

              setTimeout(() => {
                window.location.reload();

                setRegData({
                  fullname: "",
                  jamb_reg_num: "",
                  generated_password: "",
                  password: "",
                });
              }, 5000);
            } else {
              setRegistrationErrors(resData.non_field_errors);
              setRegistrationSuccess(null);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      setIsReady(false);
    };
  }, [isReady]);

  return (
    <div>
      <header className="register-header mx-auto">
        {" "}
        <br />
        <br />
        <br />
        <br />
        <div className="register-card mx-auto">
          <h2 className="text-center pt-5">Register</h2>

          <form className="container" onSubmit={handleSubmit}>
            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Full Name">Full name</label>
              <input
                id="fullname"
                value={regData.fullname}
                onChange={handleChange}
                type="text"
                className="form-control mt-2"
              />
            </div>

            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Jamb no">Jamb Reg. No.</label>
              <input
                id="jamb_reg_num"
                value={regData.jamb_reg_num}
                onChange={handleChange}
                type="text"
                className="form-control mt-2"
              />
            </div>

            <button
              className="btn btn-primary d-block col-10 p-3 mx-auto mt-5"
              type="submit"
            >
              Generate password
            </button>

            {regData.password !== "" && (
              <section className="d-block col-10 p-3 mx-auto mt-3 bg-secondary text-white text-center rounded">
                {regData.password}
              </section>
            )}

            {registrationSuccess && (
              <section className="d-block col-10 p-3 mx-auto mt-3 bg-success text-white text-center rounded">
                Registration Successful!
              </section>
            )}

            {registrationErrors &&
              registrationErrors.length > 0 &&
              registrationErrors.map((error, i) => (
                <section
                  className="d-block col-10 p-2 mx-auto mt-2 bg-danger text-white text-center rounded"
                  key={i}
                >
                  {error}
                </section>
              ))}
          </form>
        </div>
      </header>
    </div>
  );
}
export default Register;
