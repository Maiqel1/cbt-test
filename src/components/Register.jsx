function Register() {
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

          <form className="container">
            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Full Name">Full name</label>
              <input type="text" className="form-control mt-2" />
            </div>

            <div className="col-10 mx-auto mt-5">
              <label htmlFor="Jamb no">Jamb Reg. No.</label>
              <input type="text" className="form-control mt-2" />
            </div>

                <button className="btn btn-primary d-block col-10 p-3 mx-auto mt-5">Generate password</button>
          </form>
        </div>
      </header>
    </div>
  );
}
export default Register;
