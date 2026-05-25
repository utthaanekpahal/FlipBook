import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen">

      <div className="flex justify-center mt-12">
        <div className="flex gap-6  p-6 rounded-xl shadow-lg">

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-2xl font-bold text-[#572C10] mb-1">
              Category
            </label>
            <select className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572C10]">
              <option>Navbodh</option>
              <option>Gyanbodh</option>
            </select>
          </div>

          {/* Class */}
          <div className="flex flex-col">
            <label className="text-2xl font-bold text-[#572C10] mb-1">
              Class
            </label>
            <select className="border px-3 py-2 rounded-lg ">
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
            </select>
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-2xl font-bold text-[#572C10] mb-1">
              Type
            </label>
            <select className="border px-3 py-2 rounded-lg ">
              <option>Semester </option>
              <option>Yearly</option>
            </select>
          </div>

          {/* Books */}
          <div className="flex flex-col">
            <label className="text-2xl font-bold text-[#572C10] mb-1">
              Books
            </label>
            <select className="border px-3 py-2 rounded-lg ">
              <option>Maths</option>
              <option>Science</option>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

        </div>
      </div>

     

      {/* 🔷 BOOK GRID */}
      <div className="flex justify-center pb-20 mt-14">
        <div className="w-[900px] grid grid-cols-3 gap-6">

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book8.jpg" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book2.jfif" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book11.jpg" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book12.jpg" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book5.jfif" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img
              src="https://m.media-amazon.com/images/I/71+TwKNoQVL._AC_UF1000,1000_QL80_.jpg"
              className="w-full h-[350px] object-cover"
            />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2Uqs40QJCCVlNGk29dO0-_H8iOJIr_6R2w&s"
              className="w-full h-[350px] object-cover"
            />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img src="/book1.jpg" className="w-full h-[350px] object-cover" />
          </div>

          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfMVbs2bvpy1YDYuyJahoBdnrdaQk_KD4wQ&s"
              className="w-full h-[350px] object-cover"
            />
          </div>

        </div>
      </div>

      {/* 🔷 BUTTONS */}
      <div className="flex justify-center gap-4 pb-10">

        <button className="px-6 py-2 bg-[#572C10] font-bold text-2xl text-white rounded shadow-md">
          View More
        </button>

        <button
          onClick={() => {
            if (location.state?.from === "agent") {
              navigate("/agentdashboard");
            } else {
              navigate("/dashboard");
            }
          }}
          className="px-6 py-2 bg-gray-500 font-bold text-2xl text-white rounded shadow-md"
        >
          Back
        </button>

      </div>

    </div>
  );
};

export default Books;