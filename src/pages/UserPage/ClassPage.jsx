import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { className, category } = location.state || {};

  const [mongoBooks, setMongoBooks] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books");

        const filtered = res.data.data.filter(
          (item) =>
            item.category === category &&
            item.className === className
        );

        setMongoBooks(filtered);
      } catch (error) {
        console.log("API ERROR:", error.message);
      }
    };

    if (category && className) {
      fetchBooks();
    }
  }, [category, className]);

  const books =
    typeFilter === "All"
      ? mongoBooks
      : mongoBooks.filter(
          (b) =>
            (b.type || "").trim().toLowerCase() ===
            typeFilter.trim().toLowerCase()
        );

  return (
    <div className="min-h-screen lg:ml-[15px] lg:w-[99%] rounded-xl w-full bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7] px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3b2414]">
          📚 {className || "Class"}
        </h1>

        <p className="text-base sm:text-lg font-semibold text-[#7a4a2a] mt-2">
          {category || "Category"}
        </p>

        <div className="w-20 h-1 bg-[#99582A] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">

        {[
          { label: "All", color: "red" },
          { label: "Semester", color: "blue" },
          { label: "Yearly", color: "purple" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => setTypeFilter(btn.label)}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm sm:text-base
              transition-all duration-300 border
              ${
                typeFilter === btn.label
                  ? `bg-${btn.color}-600 text-white shadow-lg scale-105`
                  : "bg-white text-[#3b2414] border-[#e6d5c9] hover:shadow-md"
              }
            `}
          >
            {btn.label}
          </button>
        ))}

      </div>

      {/* GRID WRAPPER (CENTER FIX) */}
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">

          {/* BOOK GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">

            {books.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/flipPage", {
                    state: {
                      title: item.title,
                      pdf: item.fileUrl,
                    },
                  })
                }
                className="
                  w-full max-w-[360px]
                  bg-white
                  border border-[#eadfd3]
                  rounded-3xl
                  overflow-hidden
                  cursor-pointer
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-300
                "
              >

                {/* IMAGE */}
                <div className="relative">

                  <img
                    src={item.img || "/default.jpg"}
                    alt={item.title}
                    className="w-full h-[220px] sm:h-[250px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h2 className="text-lg font-bold text-[#3b2414]">
                    {item.title}
                  </h2>

                  {item.subject && (
                    <p className="text-[#99582A] font-semibold mt-1">
                      {item.subject}
                    </p>
                  )}

                  {item.type && (
                    <span className="
                      inline-block mt-3
                      px-3 py-1
                      text-xs font-bold
                      rounded-full
                      bg-[#f3e7df]
                      text-[#7a4a2a]
                    ">
                      {item.type}
                    </span>
                  )}

                  <p className="text-sm mt-3 text-gray-600 line-clamp-2">
                    {item.description || "No description available"}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* NO DATA */}
      {books.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-xl sm:text-2xl text-red-500 font-bold">
            No Books Found
          </p>
        </div>
      )}

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-14">
        <button
          onClick={() => navigate(-1)}
          className="
            bg-gradient-to-r from-[#99582A] to-[#c98b4d]
            text-white
            px-10 py-3
            rounded-2xl
            font-semibold
            shadow-lg
            hover:scale-105
            transition-all
          "
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default ClassPage;