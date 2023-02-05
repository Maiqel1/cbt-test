import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    jamb_reg_num: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginData),
    };

    fetch("https://cbt-mock-api.onrender.com/api/users/login/", options)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.access) {
          const authtoken = resData;

          fetch(
            `https://cbt-mock-api.onrender.com/api/users/verify/${loginData.jamb_reg_num}/`
          )
            .then((res) => res.json())
            .then((resData) => {
              if (resData.fullname) {
                setLoginSuccess("Login Successful!");
                setLoginError(null);
                window.localStorage.setItem("student", JSON.stringify(resData));
                window.localStorage.setItem(
                  "authtoken",
                  JSON.stringify(authtoken)
                );

                setTimeout(() => {
                  navigate("/quiz");
                }, 2000);
              }
            });
        } else {
          setLoginError("Incorrect login details!");
          setLoginSuccess(null);
        }
      });
  };

  return (
    <div>
      <header className="register-header mx-auto">
        {" "}
        <br />
        <br />
        <br />
        <br />
        <div className="register-card mx-auto">
          <h2 className="text-center pt-5">Login</h2>

          <form className="container" onSubmit={handleSubmit}>
            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Full Name">Jamb Reg. No.</label>
              <input
                id="jamb_reg_num"
                value={loginData.jamb_reg_num}
                onChange={handleChange}
                type="text"
                className="form-control mt-2"
              />
            </div>

            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Jamb no">Password</label>
              <input
                id="password"
                value={loginData.password}
                onChange={handleChange}
                type="text"
                className="form-control mt-2"
              />
            </div>

            <button
              className="btn btn-primary d-block col-10 p-3 mx-auto mt-5"
              type="submit"
            >
              Login
            </button>

            {loginSuccess && (
              <section className="d-block col-10 p-3 mx-auto mt-3 bg-success text-white text-center rounded">
                {loginSuccess}
              </section>
            )}

            {loginError && (
              <section className="d-block col-10 p-2 mx-auto mt-3 bg-danger text-white text-center rounded">
                {loginError}
              </section>
            )}
          </form>
        </div>
      </header>
    </div>
  );
}
export default Login;
