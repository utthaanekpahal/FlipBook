import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import booksData from "../data/booksData.json";

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // DATA FROM PREVIOUS PAGE
  const { className, category, book } = location.state || {};

  // GET BOOKS FROM JSON
  const books =
    booksData?.[category]?.[book]?.[className] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">

      {/* TOP SECTION */}
      <div className="text-center mb-12">

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#99582A] to-[#572C10] bg-clip-text text-transparent">
          📚 {className}
        </h1>

        <p className="text-lg md:text-xl font-bold mt-3 text-[#572C10]">
          {category} → {book}
        </p>

      </div>

      {/* BOOKS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {books.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              navigate("/flipPage", {
                state: {
                  title: item.title,
                  pdf: item.pdf,
                },
              })
            }
            className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-bold text-[#3B2F2F] line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {item.description}
              </p>

              <button
                className="mt-5 w-full bg-gradient-to-r from-[#99582A] to-[#572C10] text-white py-3 rounded-xl font-bold shadow-lg"
              >
                📖 Read Book
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* NO BOOKS */}
      {books.length === 0 && (
        <div className="text-center mt-20">

          <p className="text-2xl font-bold text-red-500">
            No Books Found
          </p>

        </div>
      )}

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-14">

        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-[#99582A] to-[#572C10] text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          ← Back
        </button>

      </div>

    </div>
  );
};

export default ClassPage;