import React, { useState } from "react";
import Google from "../assets/imges/svg.svg";
import Facebook from "../assets/imges/fsvg.svg";
import Insta from "../assets/imges/isvg.svg";
import { useNavigate } from "react-router-dom";

function SignupForm() {

  const navigate = useNavigate();

  const [first, setfirst] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const getvalue = (e) => {
    const { name, value } = e.target;

    setfirst((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const matchvalue = () => {

    if (first.password === first.confirmPassword) {
      navigate("/Loginform");
    }

    else {
      navigate("/Dashboard");
    }
  };

  return (
    <div className="form1">

      <form className="form">

        <h1>Sign in</h1>

        <label className="label">Username</label>

        <input
          onChange={getvalue}
          name="username"
          type="text"
          placeholder="Enter your Username"
        />

        <label className="label">Password</label>

        <input
          type="password"
          onChange={getvalue}
          name="password"
          placeholder="Enter your Password"
        />

        <label className="label1">Confirm Password</label>

        <input
          type="password"
          onChange={getvalue}
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <div className="btn">
          <button onClick={matchvalue} type="button">
            Sign in
          </button>
        </div>

        <div className="Nhead">
          <span>or Sign up with</span>
        </div>

        <div className="icons">

          <button className="cr">
            <img src={Google} alt="google" />
          </button>

          <button className="fb">
            <img src={Facebook} alt="facebook" />
          </button>

          <button className="insta">
            <img src={Insta} alt="instagram" />
          </button>

        </div>

        <div className="acc">
          <span>
            Do you already have an account?
            <a> Click here</a>
          </span>
        </div>

      </form>

    </div>
  );
}

export default SignupForm;