import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Google from "../assets/imges/svg.svg";
import Facebook from "../assets/imges/fsvg.svg";
import Insta from "../assets/imges/isvg.svg";

function SignupForm() {

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (isLoggedIn === "true") {
      if (role === "agent") {
        navigate("/AgentDashboard", { replace: true });
      } else {
        navigate("/Dashboard", { replace: true });
      }
    }
  }, [navigate]);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

 const matchvalue = async () => {
  let newErrors = {};

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!gmailRegex.test(first.username)) {
    newErrors.username = "Only Gmail IDs are allowed";
  }

  if (!passwordRegex.test(first.password)) {
    newErrors.password =
      "More than 8 chars, upper, lower, number symbol req";
  }

  if (first.password !== first.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      {
        username: first.username,
        password: first.password,
        confirmPassword: first.confirmPassword,
      }
    );

    if (response.data.success) {
      navigate("/Loginform", {
        replace: true,
      });
    }

  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Signup Failed"
    );
  }
};

  return (

    <div className="bg-[url('./assets/imges/bgimg.PNG')] bg-no-repeat bg-cover bg-center min-h-screen w-full flex justify-center items-center p-4">

      <form className="flex flex-col justify-center items-center gap-[11px] bg-white/80 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.2)] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[35%] p-[20px] py-[30px]">
        <h1 className="mt-[-5px] mb-[1px] font-bold text-2xl">
          Sign in
        </h1>

        {/* USERNAME */}

        <label className="w-full max-w-[450px] text-left">
          Username
        </label>

        <input
          type="text"
          name="username"
          placeholder="Enter your Gmail"
          onChange={getvalue}
          className="p-[6px] w-full max-w-[450px] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
        />

        {/* ✅ ADDED: Username Error */}
        {errors.username && (
          <p className="text-red-500 text-sm w-full max-w-[450px]">
            {errors.username}
          </p>
        )}

        {/* PASSWORD */}

        <label className="w-full max-w-[450px] text-left">
          Password
        </label>

        <div className="relative w-full max-w-[450px]">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter your Password"
            onChange={getvalue}
            className="p-[6px] w-full max-w-[450px] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
          />

          <span
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            👁️
          </span>
        </div>

        {/* Password Error */}
        {errors.password && (
          <p className="text-red-500 text-sm w-full max-w-[450px]">
            {errors.password}
          </p>
        )}
        {/* CONFIRM PASSWORD */}

        <label className="w-full max-w-[450px] text-left">
          Confirm Password
        </label>

        <div className="relative w-full max-w-[450px]">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={getvalue}
            className="p-[6px] w-full max-w-[450px] rounded-[5px] outline-none border-2 border-[rgba(128,128,128,0.3)]"
          />

          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            👁️
          </span>
        </div>

        {/* Confirm Password Error */}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm w-full max-w-[450px]">
            {errors.confirmPassword}
          </p>
        )}

        {message && (
          <p className="text-red-500 text-sm">
            {message}
          </p>
        )}

        <div className="mt-[10px]">

          <div className="mt-[10px] w-full max-w-[450px]">
            <button
              type="button"
              onClick={matchvalue}
              className="w-full p-[10px] rounded-[10px] border-none bg-[#99582A] text-white font-bold cursor-pointer"
            >
              Sign in
            </button>
          </div>

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