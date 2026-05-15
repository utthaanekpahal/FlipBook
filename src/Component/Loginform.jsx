import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import bgimg from "../assets/imges/bgimg.PNG";
export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user=localStorage.getItem("username")
    const pass=localStorage.getItem("password")

    if (data.username === user && data.password === pass ) {
      navigate("/Dashboard", { replace: true });
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${bgimg})` }}
    >

      <div className="w-full max-w-sm mx-4 p-6 md:p-10 bg-white/70 backdrop-blur-sm rounded-2xl text-center shadow-lg">

        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-800">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Log in to continue your reading journey with Book Flip
        </p>

        <form onSubmit={handleSubmit}>

          <div className="relative mb-4">

            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
              className="w-full h-11 border border-gray-200 rounded-lg pl-11 pr-3 outline-none shadow-sm focus:border-[#99582A] focus:ring-2 focus:ring-[#99582A]/20 transition"
            />

          </div>

          <div className="relative mb-4">

            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full h-11 border border-gray-200 rounded-lg pl-11 pr-3 outline-none shadow-sm focus:border-[#99582A] focus:ring-2 focus:ring-[#99582A]/20 transition"
            />

          </div>

          <div className="text-right mb-3">

            <a
              href="#"
              className="text-[#99582A] font-semibold text-sm hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          <div className="flex items-center justify-start mb-4">

            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-[#99582A] rounded"
            />

            <label
              htmlFor="remember"
              className="ml-2 whitespace-nowrap text-sm text-gray-700"
            >
              Remember Me
            </label>

          </div>

          {error && (
            <p className="text-red-500 text-sm mb-2">
              {error}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-4/5 bg-[#99582A] text-white py-2 rounded-lg mt-2 font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Log In
            </button>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            or Log In with
          </p>

          <div className="flex justify-center gap-3 mt-4">

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <FcGoogle />
              <span className="text-sm text-gray-700">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <FaFacebook className="text-blue-600" />
              <span className="text-sm text-gray-700">Facebook</span>
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}