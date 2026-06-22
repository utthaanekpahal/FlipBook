import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { className, category } = location.state || {};

  const [mongoBooks, setMongoBooks] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");

  // ================= API DATA =================
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/books"
        );

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

  // ================= FILTER =================
  const books =
    typeFilter === "All"
      ? mongoBooks
      : mongoBooks.filter(
          (b) =>
            (b.type || "").trim().toLowerCase() ===
            typeFilter.trim().toLowerCase()
        );

  return (
    <div className="min-h-screen ml-[15px] rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#572C10]">
          📚 {className || "Class"}
        </h1>

        <p className="text-lg font-bold mt-2 text-[#572C10]">
          {category || "Category"}
        </p>
      </div>

      {/* ================= TYPE FILTER ================= */}
      <div className="flex justify-center gap-4 mb-10">

        <button
          onClick={() => setTypeFilter("All")}
          className={`px-6 py-2 rounded-xl font-bold border ${
            typeFilter === "All"
              ? "bg-[#572C10] text-white"
              : "bg-white text-[#572C10]"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setTypeFilter("Semester")}
          className={`px-6 py-2 rounded-xl font-bold border ${
            typeFilter === "Semester"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Semester
        </button>

        <button
          onClick={() => setTypeFilter("Yearly")}
          className={`px-6 py-2 rounded-xl font-bold border ${
            typeFilter === "Yearly"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600"
          }`}
        >
          Yearly
        </button>

      </div>

      {/* ================= BOOK GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition"
          >

            <img
              src={item.img || "/default.jpg"}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />

            <div className="p-4">

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              {item.subject && (
                <p className="text-blue-600 font-bold mt-1">
                  {item.subject}
                </p>
              )}

              {item.type && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full bg-gray-200">
                  {item.type}
                </span>
              )}

              <p className="text-sm mt-2 text-gray-600">
                {item.description ||
                  "No description available"}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* ================= NO DATA ================= */}
      {books.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-2xl text-red-500 font-bold">
            No Books Found
          </p>
        </div>
      )}

      {/* ================= BACK BUTTON ================= */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#572C10] text-white px-6 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default ClassPage;