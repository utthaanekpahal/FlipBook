import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  // 🔥 dynamic data from admin
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
      <h1 className="text-4xl font-bold text-center pt-24 text-[#99582A] mb-10">
        Categories
      </h1>

      {/* CATEGORY CARDS */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10">
        {data.map((item) => (
          <div
            key={item.category}
            className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-2xl w-full sm:w-[320px]"
          >
            <h2 className="flex items-center justify-center gap-3 text-2xl font-bold mb-6">
              <img
                src={item.icon || "/nav.png"}
                className="w-12 h-12 rounded-full border-2 border-[#99582A]"
              />
              {item.category}
            </h2>

            {/* BOOK LIST */}
            <div className="flex flex-col gap-4">
              {item.books?.map((book) => (
                <div
                  key={book.title}
                  onClick={() =>
                    setSelectedBook({
                      ...book,
                      category: item.category,
                    })
                  }
                  className="flex items-center gap-3 bg-white/80 p-3 rounded-xl font-bold cursor-pointer"
                >
                  <FaBook className="text-blue-500" />
                  {book.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[400px]">

            <h2 className="text-xl font-bold text-center mb-4 text-[#99582A]">
              {selectedBook.title}
            </h2>

            <div className="max-h-[300px] overflow-y-auto">
              {selectedBook.classes?.map((cls) => (
                <div
                  key={cls}
                  onClick={() =>
                    navigate("/agent/classpage", {
                      state: {
                        className: cls,
                        book: selectedBook.title,
                        category: selectedBook.category,
                      },
                    })
                  }
                  className="bg-gray-100 p-3 rounded-lg mb-2 cursor-pointer"
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