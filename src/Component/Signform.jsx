import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Google from "../assets/imges/svg.svg";
import Facebook from "../assets/imges/fsvg.svg";
import Insta from "../assets/imges/isvg.svg";

function SignupForm() {
  const navigate = useNavigate();

  const [first, setfirst] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const getvalue = (e) => {
    const { name, value } = e.target;

    setfirst((prev) => ({
      ...prev, [name]: value
    }));
  };

  const matchvalue = () => {
    // Get already stored username
    const existingUser = localStorage.getItem("username");

    // Check if already registered
    if (existingUser === first.username) {
      setMessage("User already registered!");
      return;
    }

    if (first.password === first.confirmPassword) {
      localStorage.setItem("username", first.username);
      localStorage.setItem("password", first.confirmPassword);

      navigate("/Loginform", { replace: true });
    } else {
      navigate("/FlipPage");
    }
  };

  return (
    <div className="bg-[url('./assets/imges/bgimg.PNG')] bg-no-repeat bg-cover bg-center h-screen w-full flex justify-center items-center max-[770px]:bg-[length:100%_105%]">

      <form className="flex flex-col justify-center items-center gap-[11px] h-[80vh] w-[26vw] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-[#fffbff] max-[770px]:mt-[-10%] max-[770px]:w-[45%] max-[770px]:h-auto max-[770px]:p-[20px]">

        <h1 className="mt-[-5px] mb-[1px] font-bold text-2xl">
          Sign in
        </h1>

        <label className="mr-[49%]">Username</label>

        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        <label className="mr-[50%]">Password</label>

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        <label className="mr-[33%]">Confirm Password</label>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        {message && (
          <p className="text-red-500 text-sm">
            {message}
          </p>
        )}

        <div className="mt-[10px]">
          <button
            type="button"
            onClick={matchvalue}
            className="w-[15vw] p-[10px] rounded-[10px] border-none bg-[#99582A] text-white font-bold cursor-pointer"
          >
            Sign in
          </button>
        </div>

        <div className="mt-[2px]">
          <span>or Sign up with</span>
        </div>

        <div className="flex justify-center items-center gap-[10px] mt-[2px]">

          <button
            type="button"
            onClick={() => window.open("https://www.google.com", "_blank")}
            className="flex justify-center items-center p-[5px] rounded-[25px] border-none cursor-pointer"
          >
            <img src={Google} alt="google" className="h-[15px] w-[15px]" />
          </button>

          <button
            type="button"
            onClick={() => window.open("https://www.facebook.com", "_blank")}
            className="flex justify-center items-center p-[5px] rounded-[25px] border-none cursor-pointer"
          >
            <img src={Facebook} alt="facebook" className="h-[15px] w-[15px]" />
          </button>

          <button
            type="button"
            onClick={() => window.open("https://www.instagram.com", "_blank")}
            className="flex justify-center items-center p-[5px] rounded-[25px] border-none cursor-pointer"
          >
            <img src={Insta} alt="instagram" className="h-[15px] w-[15px]" />
          </button>

        </div>

        <div className="mt-[2px]">
          <span>
            Do you already have an account?{" "}
            <Link
              to="/Loginform"
              className="no-underline font-bold text-[#99582A] cursor-pointer hover:text-black"
            >
              Click here
            </Link>
          </span>
        </div>

      </form>
    </div>
  );
}

export default SignupForm;