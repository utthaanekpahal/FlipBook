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

  // ✅ ADDED: Error state for validations
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const getvalue = (e) => {

    const { name, value } = e.target;

    setfirst((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const matchvalue = () => {

    // ✅ ADDED: Empty object for storing errors
    let newErrors = {};

    // ✅ ADDED: Gmail validation regex
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // ✅ ADDED: Strong password regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8}$/;

    // ✅ Username Validation
    if (!gmailRegex.test(first.username)) {
      newErrors.username = "Only Gmail IDs are allowed";
    }

    // ✅ Password Validation
    if (!passwordRegex.test(first.password)) {
      newErrors.password =
        "Only 8 chars, upper, lower, number symbol req";
    }

    // ✅ Confirm Password Validation
    if (first.password !== first.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // ✅ ADDED: If errors exist stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ ADDED: Clear errors if validation passes
    setErrors({});

    // Get already stored username
    const existingUser = localStorage.getItem("username");

    // Check if already registered
    if (existingUser === first.username) {
      setMessage("User already registered!");
      return;
    }

    // Store data
    localStorage.setItem("username", first.username);
    localStorage.setItem("password", first.confirmPassword);

    navigate("/Loginform", { replace: true });
  };

  return (

    <div className="bg-[url('./assets/imges/bgimg.PNG')] bg-no-repeat bg-cover bg-center h-screen w-full flex justify-center items-center max-[770px]:bg-[length:100%_105%]">

      <form className="flex flex-col justify-center items-center gap-[11px] h-[90vh] w-[30vw] rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-[#fffbff] max-[770px]:mt-[-10%] max-[770px]:w-[45%] max-[770px]:h-auto max-[770px]:p-[20px]">

        <h1 className="mt-[-5px] mb-[1px] font-bold text-2xl">
          Sign in
        </h1>

        {/* USERNAME */}

        <label className="mr-[42%]">Username</label>

        <input
          type="text"
          name="username"
          placeholder="Enter your Gmail"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        {/* ✅ ADDED: Username Error */}
        {errors.username && (
          <p className="text-red-500 text-sm mr-[18%]">
            {errors.username}
          </p>
        )}

        {/* PASSWORD */}

        <label className="mr-[42%]">Password</label>

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        {/* ✅ ADDED: Password Error */}
        {errors.password && (
          <p className="text-red-500 text-sm ml-[50px]">
            {errors.password}
          </p>
        )}

        {/* CONFIRM PASSWORD */}

        <label className="mr-[28%]">Confirm Password</label>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={getvalue}
          className="p-[6px] w-[18vw] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        {/* ✅ ADDED: Confirm Password Error */}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mr-[90px]">
            {errors.confirmPassword}
          </p>
        )}

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