import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import bgimg from "../assets/imges/bgimg.PNG";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Check if already logged in
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // Clear field error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!gmailRegex.test(data.username)) {
      newErrors.username = "Enter valid Gmail address";
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "morethan 8 chars, upper, lower, number & symbol required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const user = localStorage.getItem("username");
    const pass = localStorage.getItem("password");
    const agents =JSON.parse(localStorage.getItem("agents")) || [];
    const agent = agents.find(
    (item) => item.email === data.username);
    // ✅ Agent Login
    if (agent&& data.username === agent.email && data.password === agent.AgentconfirmPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "agent");

      navigate("/AgentDashboard", { replace: true });
    }

    // ✅ User Login
    else if (data.username === user && data.password === pass) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");

      navigate("/Dashboard", { replace: true });
    }

    // ❌ Invalid Credentials
    else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div
  className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative px-3 py-6"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 "></div>

      <div className="relative w-full max-w-md mx-4 p-5 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

       
       <p className="text-center text-xs sm:text-sm text-gray-600 mt-2 mb-6">
          Log in to continue your reading journey with Book Flip
        </p>

        <form onSubmit={handleSubmit} >
          {/* Username */}
          <div className="relative mb-[5%] ">
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

          {/* Username Error */}
          {errors.username && (
            <p className="text-red-500 text-sm mt-[-2%] mb-[3%] transition-all">
              {errors.username}
            </p>
          )}

          {/* Password */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full h-11 border rounded-lg pl-10 pr-10 outline-none focus:ring-2 focus:ring-[#99582A]"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              👁️
            </span>
          </div>

          {/* Password Error */}
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
            <label className="ml-2 text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          {/* Login Error */}
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mb-3">{error}</p>
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

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => window.open("https://www.google.com", "_blank")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 mt-6 text-center">
            <span>If you don't have an account ? </span>

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