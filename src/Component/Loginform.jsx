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
      "https://flipbook-1-l2tf.onrender.com/api/books/login",
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
  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
>
  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
</span>
          </div>

          {/* Password Error */}
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password}
            </p>
          )}
          {/* Login Error */}
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mb-3">{error}</p>
          )}

          {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#99582A] text-white py-2 rounded-lg font-semibold flex justify-center items-center"
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 mt-6 text-center">
            <span>If you don't have an account ? Contact your Admin </span>
          </div>
        </form>
      </div>
    </div>
  );
}