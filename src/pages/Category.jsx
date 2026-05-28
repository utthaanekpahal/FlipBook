import React, { useState } from "react";
import {
  FaBook,
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedBook, setSelectedBook] = useState(null);

  const data = [
    {
      category: "Navbodh",
      icon: "/nav.png",
      books: [
        {
          title: "Book N1",
          classes: ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8"],
        },
        {
          title: "Book N2",
          classes: ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8"],
        },
      ],
    },

    {
      category: "Gyanbodh",
      icon: "/gyan.png",
      books: [
        {
          title: "Book G1",
          classes: ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8"],
        },
        {
          title: "Book G2",
          classes: ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8"],
        },
      ],
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
     
   
      {/* Title */}
      <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-center pt-24 text-[#99582A] mb-10">
        Categories
      </h1>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10">

        {data.map((item) => (
          <div
            key={item.category}
            className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-2xl w-full sm:w-[320px] hover:scale-105 transition"
          >

            <h2 className="flex items-center justify-center gap-3 text-2xl font-bold mb-6 text-[#3B2F2F]">

              <img
                src={item.icon}
                alt={item.category}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#99582A]"
              />

              {item.category}
            </h2>

            {/* BOOKS */}
            <div className="flex flex-col gap-4">
              {item.books.map((book, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setSelectedBook({
                      ...book,
                      category: item.category,
                    })
                  }
                  className="flex items-center gap-3 bg-white/80 p-3 rounded-xl font-bold cursor-pointer hover:bg-white transition shadow-md"
                >
                  <FaBook className="text-blue-500" />
                  {book.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            if (location.state?.from === "agent") {
              navigate("/agentdashboard");
            } else {
              navigate("/dashboard");
            }
          }}
          className="bg-[#99582A] text-white text-2xl px-8 py-3 rounded-xl font-bold hover:bg-[#7a451f] transition"
        >
          Back
        </button>
      </div>

      {/* POPUP */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[400px]">

            <h2 className="text-xl font-bold text-center mb-4 text-[#99582A]">
              {selectedBook.title}
            </h2>

            <div className="max-h-[300px] overflow-y-auto">
              {selectedBook.classes.map((cls, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate("/classpage", {
                      state: {
                        className: cls,
                        book: selectedBook.title,
                        category: selectedBook.category,
                      },
                    })
                  }
                  className="bg-gray-100 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-200"
                >
                  {cls}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-4 bg-[#99582A] text-white p-3 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Category;