import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = localStorage.getItem("username");
    const pass = localStorage.getItem("password");

    if (data.username === user && data.password === pass) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Box */}
      <div className="relative w-full max-w-md mx-4 p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-sm text-gray-600 mt-2 mb-6">
          Log in to continue your reading journey with Book Flip
        </p>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="relative mb-4">
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

          {/* Password */}
          <div className="relative mb-3">
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

          {/* Forgot */}
          <div className="text-right mb-3">
            <a href="#" className="text-sm text-[#99582A] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Remember */}
          <div className="flex items-center mb-4 justify-center">
            <input type="checkbox" className="accent-[#99582A]" />
            <label className="ml-2 text-sm text-gray-700 ">
              Remember Me
            </label>
          </div>

          {/* Error */}
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
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <FcGoogle size={20} />
              Google
            </button>

            <button
              type="button"
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <FaFacebook className="text-blue-600" />
              Facebook
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}