import React, { useState } from "react";
import bgimg from "../assets/imges/bgimg.PNG";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Agentlogin = () => {

const navigate = useNavigate();
const [agentshowPassword, setagentShowPassword] = useState(false);
const [showagentConfirmPassword, setagentShowConfirmPassword] = useState(false);
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
     "http://localhost:3000/api/books/agentsignup",
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
      className="min-h-screen w-[99%] ml-[15px] rounded-xl  flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >

      <form
        className="w-[400px] h-[50%] bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        onSubmit={clicked}
      >

        <h2 className="text-3xl font-bold text-center text-[#572C10] mb-4">
          Agent Add
        </h2>

        {/* AGENT NAME */}
        <div className="flex flex-col">

          <label className="mb-1 font-bold">
            Agent Name:
          </label>

          <input
            type="text"
            name="agentname"
            value={infodata.agentname}
            onChange={userinfo}
            placeholder="Enter Agent Name"
            className="border p-3 rounded-lg outline-none"
          />

          {/* ✅ Error Message */}
          {errors.agentname && (
            <p className="text-red-500 text-sm">
              {errors.agentname}
            </p>
          )}

        </div>

        {/* EMAIL */}
        <div className="flex flex-col">

          <label className="mb-1 font-bold">
            Email:
          </label>

          <input
            type="email"
            name="email"
            value={infodata.email}
            onChange={userinfo}
            placeholder="Enter Gmail"
            className="border p-3 rounded-lg outline-none"
          />

          {/* ✅ Error Message */}
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}

        </div>

        {/* PASSWORD */}
        <div className="flex flex-col">

  <label className="mb-1 font-bold">
    Password
  </label>

  <div className="relative">
    <input
      type={agentshowPassword ? "text" : "password"}
      name="Password"
      value={infodata.Password}
      onChange={userinfo}
      placeholder="Enter Password"
      className="border p-3 rounded-lg outline-none w-full pr-10"
    />

    <span
      onClick={() => setagentShowPassword(!agentshowPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    >
      👁️
    </span>
  </div>

  {/* Error Message */}
  {errors.Password && (
    <p className="text-red-500 text-sm">
      {errors.Password}
    </p>
  )}

</div>

        {/* CONFIRM PASSWORD */}
       <div className="flex flex-col">

  <label className="mb-1 font-bold">
    Confirm Password
  </label>

  <div className="relative">
    <input
      type={showagentConfirmPassword ? "text" : "password"}
      name="AgentconfirmPassword"
      value={infodata.AgentconfirmPassword}
      onChange={userinfo}
      placeholder="Confirm Password"
      className="border p-3 rounded-lg outline-none w-full pr-10"
    />

    <span
      onClick={() => setagentShowConfirmPassword(!showagentConfirmPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    >
      👁️
    </span>
  </div>

  {errors.AgentconfirmPassword && (
    <p className="text-red-500 text-sm">
      {errors.AgentconfirmPassword}
    </p>
  )}

</div>

        <button
          type="submit"
          className="bg-[#572C10] text-white font-bold rounded-xl py-3 mt-2 text-2xl"
        >
          Submit
        </button>

      </form>

    </div>
  );
};

export default Agentlogin;