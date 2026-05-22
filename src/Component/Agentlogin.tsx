import React, { useState } from "react";
import bgimg from "../assets/imges/bgimg.PNG";
import { useNavigate } from 'react-router-dom';

const Agentlogin = () => {
  const navigate = useNavigate();
  const [infodata, setinfodata] = useState({
    agentname: "",
    email: "",
    Password:"",
    AgentconfirmPassword: ""
  });

  const userinfo = (e) => {
    const { name, value } = e.target;

    setinfodata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clicked = (e) => {
    e.preventDefault(); // form reload stop
    const existingUser = localStorage.getItem("Aname");

    // Check if already registered
    if (existingUser === infodata.agentname) {
      alert("User already registered!");
      setinfodata({
      agentname: "",
      email: "",
      Password:"",
      AgentconfirmPassword: ""
    });
      return;
      
    }
    if(infodata.Password === infodata.AgentconfirmPassword){
     localStorage.setItem("Aname", infodata.agentname);
     localStorage.setItem("Acpass",infodata.AgentconfirmPassword);
     localStorage.setItem("Apass", infodata.Password);
     localStorage.setItem("Aemail",infodata.email);
     navigate("/Dashboard")
    }
    else{
      alert("plaese enter correct password")
      setinfodata({
      agentname: "",
      email: "",
      Password:"",
      AgentconfirmPassword: ""
    });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form
        className="w-[400px] bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        onSubmit={clicked}
      >
        <h2 className="text-3xl font-bold text-center text-[#572C10] mb-4">
          Agent Add
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 font-bold">Agent Name:</label>
          <input
            type="text"
            name="agentname"
             value={infodata.agentname}
            onChange={userinfo}
            placeholder="Enter Agent Name"
            className="border p-3 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            value={infodata.email}
            onChange={userinfo}
            placeholder="Enter Agent Email"
            className="border p-3 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-bold">Password</label>
          <input
            type="Password"
            name="Password"
             value={infodata.Password}
            onChange={userinfo}
            placeholder="Enter your Phone Number"
            className="border p-3 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-bold">Confirm Password</label>
          <input
            type="Phone Number"
            name="AgentconfirmPassword"
             value={infodata.AgentconfirmPassword}
            onChange={userinfo}
            placeholder="Enter your Phone Number"
            className="border p-3 rounded-lg outline-none"
          />
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