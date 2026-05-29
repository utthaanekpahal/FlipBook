import React, { useState } from "react";
import bgimg from "../assets/imges/bgimg.PNG";
import { useNavigate } from "react-router-dom";

const Agentlogin = () => {

  const navigate = useNavigate();

  const [infodata, setinfodata] = useState({
    agentname: "",
    email: "",
    Password: "",
    AgentconfirmPassword: ""
  });

  // ✅ ADDED: Validation error state
  const [errors, setErrors] = useState({});

  const userinfo = (e) => {

    const { name, value } = e.target;

    setinfodata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clicked = (e) => {

    e.preventDefault();

    // ✅ ADDED: Empty object for errors
    let newErrors = {};

    // ✅ ADDED: Gmail validation regex
    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // ✅ ADDED: Strong password regex
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    // ✅ Agent Name Validation
    if (infodata.agentname.trim() === "") {
      newErrors.agentname = "Agent name is required";
    }

    // ✅ Email Validation
    if (!gmailRegex.test(infodata.email)) {
      newErrors.email = "Only Gmail IDs are allowed";
    }

    // ✅ Password Validation
    if (!passwordRegex.test(infodata.Password)) {
      newErrors.Password =
        "Password must contain uppercase, lowercase, number, symbol and minimum 8 characters";
    }

    // ✅ Confirm Password Validation
    if (infodata.Password !== infodata.AgentconfirmPassword) {
      newErrors.AgentconfirmPassword =
        "Passwords do not match";
    }

    // ✅ STOP form if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Clear old errors
    setErrors({});

    const existingUser = localStorage.getItem("Aname");

    // ✅ Check if already registered
    if (existingUser === infodata.agentname) {

      alert("User already registered!");

      setinfodata({
        agentname: "",
        email: "",
        Password: "",
        AgentconfirmPassword: ""
      });

      return;
    }

    // ✅ Store data
    localStorage.setItem("Aname", infodata.agentname);
    localStorage.setItem("Acpass", infodata.AgentconfirmPassword);
    localStorage.setItem("Apass", infodata.Password);
    localStorage.setItem("Aemail", infodata.email);

    navigate("/Dashboard");
  };

  return (

    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
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

          <input
            type="password"
            name="Password"
            value={infodata.Password}
            onChange={userinfo}
            placeholder="Enter Password"
            className="border p-3 rounded-lg outline-none"
          />

          {/* ✅ Error Message */}
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

          <input
            type="password"
            name="AgentconfirmPassword"
            value={infodata.AgentconfirmPassword}
            onChange={userinfo}
            placeholder="Confirm Password"
            className="border p-3 rounded-lg outline-none"
          />

          {/* ✅ Error Message */}
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