import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import bgimg from "../assets/imges/bgimg.PNG";
import axios from "axios"
import useApiLoader from "../hook/useApiLoader";
export default function Login() {
  const navigate = useNavigate();
  const { loading, execute } = useApiLoader();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    username: "", /*admin@gmail.com,*/
    password: "", /*Admin@123*/
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // Clear field error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setError("");
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  let newErrors = {};

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!gmailRegex.test(data.username)) {
    newErrors.username = "Enter valid Gmail address";
  }

  if (!data.password) {
    newErrors.password = "Password required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  setError("");

  try {
    const response = await execute(() => axios.post(
      "https://flipbook-production.up.railway.app/api/books/login",
      {
        username: data.username,
        password: data.password,
      }) 
    );

    console.log("Login Response:", response.data);
   
   if (response.data.success) {
  const userName = data.username.split("@")[0].trim();
  localStorage.setItem("agentName", userName);
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", response.data.role);
  if (response.data.role === "admin") {
       const adminViews =
      Number(localStorage.getItem("adminViews")) || 0;

    localStorage.setItem(
      "adminViews",
      adminViews + 1
    );
    navigate("/Dashboard", { 
      replace: true,
    });
  } 
  else if (response.data.role === "agent") {
     const agentViews =
      Number(localStorage.getItem("viewsagent")) || 0;

    localStorage.setItem(
      "viewsagent",
      agentViews + 1
    );
    navigate("/AgentDashboard", {
      replace: true,
    });
  }
}
  } catch (error) {
    console.log("ERROR:", error);
    console.log("RESPONSE:", error.response?.data);

    setError(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};
 return (
  <div
    className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 py-10 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgimg})` }}
  >
    {/* Softer overlay (NOT too dark) */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Subtle gradient wash (premium soft effect) */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black/10 to-black/30"></div>

    {/* Light floating blobs */}
    <div className="absolute w-[350px] h-[350px] bg-[#99582A] opacity-10 blur-3xl rounded-full top-[-80px] left-[-80px] animate-pulse"></div>
    <div className="absolute w-[300px] h-[300px] bg-blue-400 opacity-10 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

    {/* Card (lighter glass) */}
    <div
      className="relative w-full max-w-md p-8 rounded-3xl
      bg-white/75 backdrop-blur-xl border border-white/40
      shadow-[0_15px_50px_rgba(0,0,0,0.25)]"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Sign in to continue your Book Flip journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Username */}
        <div>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              className="w-full h-12 bg-white/80 text-gray-900 placeholder-gray-500
              border border-gray-200 rounded-xl pl-10 pr-3
              outline-none focus:ring-2 focus:ring-[#99582A] transition"
              required
            />
          </div>

          {errors?.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full h-12 bg-white/80 text-gray-900 placeholder-gray-500
              border border-gray-200 rounded-xl pl-10 pr-10
              outline-none focus:ring-2 focus:ring-[#99582A] transition"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          {errors?.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-600 text-xs p-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl font-semibold text-white
          bg-gradient-to-r from-[#99582A] to-[#7a431f]
          shadow-md hover:shadow-lg
          hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Logging in...</span>
            </>
          ) : (
            "Log In"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 pt-2">
          Don’t have an account? Contact your Admin
        </p>
      </form>
    </div>
  </div>
);
}