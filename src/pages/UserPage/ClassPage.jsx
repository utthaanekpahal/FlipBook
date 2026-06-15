import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import booksData from "../../data/booksData.json";

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { className, category, book } = location.state || {};

  const [mongoBooks, setMongoBooks] = useState([]);

 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/books");

        const filtered = res.data.data.filter(
          (item) =>
            item.category === category &&
            item.book === book &&
            item.className === className
        );

        setMongoBooks(filtered);
      } catch (error) {
        console.log("API ERROR:", error.message);
      }
    };

    fetchBooks();
  }, [category, book, className]);

  // =========================
  // JSON DATA
  // =========================
  const jsonBooks =
    booksData?.[category]?.[book]?.[className] || [];

  // =========================
  // MERGE BOTH
  // =========================
  const books = [...jsonBooks, ...mongoBooks];

  return (
    <div className="min-h-screen ml-[18%] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 px-4 py-10">

      {/* TOP SECTION */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#572C10]">
          📚 {className}
        </h1>

        <p className="text-lg font-bold mt-2 text-[#572C10]">
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
                  pdf: item.fileUrl || item.pdf,
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

              <p className="text-sm mt-2">
                {item.description}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* NO BOOKS */}
      {books.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-2xl text-red-500 font-bold">
            No Books Found
          </p>
        </div>
      )}

      {/* BACK */}
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