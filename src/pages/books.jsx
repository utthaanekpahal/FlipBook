import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen">

      {/* Books Grid */}
      <div className="flex justify-center pt-10 pb-20">
        <div className="w-[900px]">
           <h1 className="text-[#572C10] text-center mb-[20px] text-3xl font-bold">
          All Books
        </h1>
          <div className="grid grid-cols-3 gap-6">
            

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book8.jpg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book2.jfif" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book11.jpg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book12.jpg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book5.jfif" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img
                src="https://m.media-amazon.com/images/I/71+TwKNoQVL._AC_UF1000,1000_QL80_.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2Uqs40QJCCVlNGk29dO0-_H8iOJIr_6R2w&s"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img src="/book1.jpg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-gray-300 h-[350px] overflow-hidden rounded-xl hover:scale-105 transition-all duration-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfMVbs2bvpy1YDYuyJahoBdnrdaQk_KD4wQ&s"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center pb-10 gap-4">


        <div className="flex gap-4">
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

    </div>
  );
};

export default Books;