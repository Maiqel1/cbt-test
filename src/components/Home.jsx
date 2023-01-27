import nsbs from "../assets/img/nsbs.png";
import unilorin from "../assets/img/unilorin.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header className="header mb-5 p-5 mx-auto">
        <div className="d-flex mx-auto justify-content-center">
          <div>
            <img src={unilorin} alt="" />
          </div>
          <div className="mt-1">
            <img src={nsbs} alt="" />
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-center text-white header-text">
            Welcome to the <br /> <span>DEVELOPMENT AND INCLUSION ERA</span>
            <br /> CBT MOCK EXAMINATION
          </h1>
        </div>

        <div className="header-buttons d-flex justify-content-center mt-5">
          <Link to={'/register'}>
          <button className="btn btn-outline-light me-3">Register</button>
          </Link>
          <Link to={'/login'}>
          <button className="btn btn-primary text-white ms-5">Login</button>
          </Link>
        </div>
      </header>
    </>
  );
}
export default Home;
