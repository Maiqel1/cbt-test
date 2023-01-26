function Login() {
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

          <form className="container">
            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Full Name">Jamb Reg. No.</label>
              <input type="text" className="form-control mt-2" />
            </div>

            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Jamb no">Password</label>
              <input type="text" className="form-control mt-2" />
            </div>

                <button className="btn btn-primary d-block col-10 p-3 mx-auto mt-5">Login</button>
          </form>
        </div>
      </header>
    </div>
  )
}
export default Login