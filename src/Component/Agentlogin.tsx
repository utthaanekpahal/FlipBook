import React, { useState } from "react";
import bgimg from "../assets/imges/bgimg.PNG";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const Agentlogin = () => {

const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

const [infodata, setinfodata] = useState({
  agentname: "",
  email: "",
  Password: "",
  AgentconfirmPassword: ""
});

const [errors, setErrors] = useState({});

// Input Handler
const userinfo = (e) => {
  const { name, value } = e.target;

  setinfodata((prev) => ({
    ...prev,
    [name]: value
  }));
};
const clicked = async (e) => {
  e.preventDefault();

  let newErrors = {};

  const gmailRegex =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (infodata.agentname.trim() === "") {
    newErrors.agentname = "Agent name is required";
  }

  if (!gmailRegex.test(infodata.email)) {
    newErrors.email = "Only Gmail IDs are allowed";
  }

  if (!passwordRegex.test(infodata.Password)) {
    newErrors.Password =
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";
  }

  if (
    infodata.Password !==
    infodata.AgentconfirmPassword
  ) {
    newErrors.AgentconfirmPassword =
      "Passwords do not match";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  try {
    const response = await axios.post(
     "https://flipbook-1-l2tf.onrender.com/api/books/agentsignup",
      {
        agentname: infodata.agentname,
        email: infodata.email,
        password: infodata.Password,
        confirmPassword:
          infodata.AgentconfirmPassword,
      }
    );
    console.log("Response:", response.data);
    if (response.data.success) {
      alert("Agent Registered Successfully");

      navigate("/Loginform", {
        replace: true,
      });
    }

  } catch (error) {
    console.log("ERROR:", error);
    console.log("RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};
// Form Submit
 return (
    <div
  className="min-h-screen lg-w-[97%] sm-w-[99%] lg:ml-[33px] rounded-xl flex items-center justify-center bg-cover bg-center p-4"
  style={{ backgroundImage: `url(${bgimg})` }}
>
  <form
    className="
      w-full
      max-w-sm
      sm:max-w-md

      bg-white/80
      backdrop-blur-md

      p-5 sm:p-6
      rounded-2xl
      shadow-lg

      flex flex-col gap-4
    "
    onSubmit={clicked}
  >

    {/* TITLE */}
    <h2 className="text-2xl font-bold text-center text-[#572C10]">
      ADD Agent
    </h2>

    {/* AGENT NAME */}
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">
        Agent Name:
      </label>

      <input
        type="text"
        name="agentname"
        value={infodata.agentname}
        onChange={userinfo}
        placeholder="Enter Agent Name"
        className="border p-3 rounded-lg outline-none text-sm"
      />

      {errors.agentname && (
        <p className="text-red-500 text-xs mt-1">
          {errors.agentname}
        </p>
      )}
    </div>

    {/* EMAIL */}
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">
        Email:
      </label>

      <input
        type="email"
        name="email"
        value={infodata.email}
        onChange={userinfo}
        placeholder="Enter Gmail"
        className="border p-3 rounded-lg outline-none text-sm"
      />

      {errors.email && (
        <p className="text-red-500 text-xs mt-1">
          {errors.email}
        </p>
      )}
    </div>

    {/* PASSWORD */}
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="Password"
          value={infodata.Password}
          onChange={userinfo}
          placeholder="Enter Password"
          className="border p-3 rounded-lg w-full pr-10 outline-none text-sm"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      </div>

      {errors.Password && (
        <p className="text-red-500 text-xs mt-1">
          {errors.Password}
        </p>
      )}
    </div>

    {/* CONFIRM PASSWORD */}
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-sm">
        Confirm Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="AgentconfirmPassword"
          value={infodata.AgentconfirmPassword}
          onChange={userinfo}
          placeholder="Confirm Password"
          className="border p-3 rounded-lg w-full pr-10 outline-none text-sm"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye />}
        </span>
      </div>

      {errors.AgentconfirmPassword && (
        <p className="text-red-500 text-xs mt-1">
          {errors.AgentconfirmPassword}
        </p>
      )}
    </div>

    {/* BUTTON */}
    <button
      type="submit"
      className="
        bg-[#572C10]
        text-white
        font-semibold
        rounded-xl
        py-3
        text-lg
        hover:bg-[#6b3512]
        transition
      "
    >
      Submit
    </button>

  </form>
</div>
  );
};

export default Agentlogin;