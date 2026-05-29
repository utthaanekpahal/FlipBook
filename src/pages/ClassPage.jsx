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
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* TOP SECTION */}
      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-[#99582A]">
          {className}
        </h1>

        <p className="text-lg font-bold mt-2 text-[#572C10]">
          {category} → {book}
        </p>

      </div>

      {/* BOOKS */}
      <div className="flex flex-wrap justify-center gap-10">

        {books.map((item, index) => (
          <div
            key={index}

            // CLICK CARD
            onClick={() =>
              navigate("/flipPage", {
                state: {
                  title: item.title,
                  pdf: item.pdf,
                },
              })
            }

            className="bg-white w-[250px] rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
          >

            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="text-2xl font-bold text-[#3B2F2F]">
                {item.title}
              </h2>

              <p className="text-sm text-[#572C10] font-bold mt-3">
                {item.description}
              </p>

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
          className="bg-[#99582A] text-white px-8 py-3 rounded-xl text-xl font-bold hover:bg-[#7a451f] transition"
        >
          Back
        </button>

      </div>

    </div>
  );
};

export default ClassPage;