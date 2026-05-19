import React from "react";
import bgimg from "../assets/imges/bgimg.PNG";

const Agentlogin = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form className="w-[400px] bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col gap-4">

        <h2 className="text-3xl font-bold text-center mb-4">
       Agent Add
        </h2>

        <div className="flex flex-col">
          <label htmlFor="agentName" className="mb-1 font-bold">
            Agent Name:
          </label>

          <input
            type="text"
            id="agentName"
            placeholder="Enter Agent Name"
            className="border p-3 rounded-lg outline-none  "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-bold">
            Email:
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter Agent Email"
            className="border p-3 rounded-lg outline-none "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-bold">
            Password:
          </label>

          <input
            type="password"
            id="password"
            placeholder="Enter Agent Password"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#99582A]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-bold">
            Phone Number:
          </label>

          <input
            type="tel"
            id="phone"
            placeholder="Enter your Phone Number"
            className="border p-3 rounded-lg outline-none "
          />
        </div>

        <button
          type="submit"
          className="bg-[#99582A] text-white font-bold rounded-xl py-3 mt-2 text-2xl"
        >
         Submit
        </button>

      </form>
    </div>
  );
};

export default Agentlogin;