import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import bgimg from "../assets/imges/bgimg.PNG";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // ✅ ADDED: error object for field validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ ADDED: reset errors every submit
    let newErrors = {};

    // ✅ Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // ✅ Password validation (strong password rule)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    // ✅ Username validation
    if (!gmailRegex.test(data.username)) {
      newErrors.username = "Enter valid Gmail address";
    }

    // ✅ Password validation
    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "only 8 chars, upper, lower, number & symbol required";
    }

    // ❌ STOP if validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Clear validation errors if valid
    setErrors({});

    // 🔐 Get stored users
    const user = localStorage.getItem("username");
    const pass = localStorage.getItem("password");
    const agent = localStorage.getItem("Aemail");
    const agentpass = localStorage.getItem("Acpass");

    // 🔐 Agent login
    if (data.username === agent && data.password === agentpass) {
      navigate("/AgentDashboard", { replace: true });
    }

    // 🔐 Normal user login
    else if (data.username === user && data.password === pass) {
      navigate("/Dashboard", { replace: true });
    }

    // ❌ Invalid credentials
    else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-md mx-4 p-8 h-[78vh] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-sm text-gray-600 mt-2 mb-6">
          Log in to continue your reading journey with Book Flip
        </p>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="relative mb-1">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              className="w-full h-11 border rounded-lg pl-10 pr-3 outline-none focus:ring-2 focus:ring-[#99582A]"
              required
            />
          </div>

          {/* ✅ Username Error */}
          {errors.username && (
            <p className="text-red-500 text-sm mb-2">
              {errors.username}
            </p>
          )}

          {/* Password */}
          <div className="relative mb-1">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full h-11 border rounded-lg pl-10 pr-3 outline-none focus:ring-2 focus:ring-[#99582A]"
              required
            />
          </div>

          {/* ✅ Password Error */}
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}

          {/* Forgot */}
          <div className="text-right mb-3">
            <a href="#" className="text-sm text-[#99582A] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Remember */}
          <div className="flex items-center mb-4 justify-start">
            <input type="checkbox" className="accent-[#99582A]" />
            <label className="ml-2 text-sm text-gray-700 ">
              Remember Me
            </label>
          </div>

          {/* Login Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#99582A] text-white py-2 rounded-lg font-semibold hover:bg-[#7f4721]"
          >
            Log In
          </button>

          {/* Social */}
          <p className="text-center text-sm mt-5 text-gray-600">
            or log in with
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => window.open("https://www.google.com", "_blank")}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <FcGoogle size={20} />
              Google
            </button>

            <button
              type="button"
              onClick={() => window.open("https://www.facebook.com", "_blank")}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <FaFacebook className="text-blue-600" />
              Facebook
            </button>
          </div>
          <div className="flex justify-center gap-[5px] mt-[30px]">
             <span>
             If you don't have an account ?{" "}
            </span>
           <Link
              to="/"
              className="no-underline font-bold text-[#99582A] cursor-pointer hover:text-black"
            >
              Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}