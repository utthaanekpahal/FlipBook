import React, { useState } from "react";
import { FaBook, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  const data = [
    {
      category: "Navbodh",
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
      books: [
        {
          title: "Book G1",
          classes: ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10"],
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
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
      <h1 className="text-3xl font-bold flex justify-center text-[#99582A] mb-10 p-20">
        Categories
      </h1>

      {/* Categories */}
      <div className="flex gap-10 justify-center flex-wrap">
        {data.map((item) => (
          <div
            key={item.category}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[300px]"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <FaFolderOpen className="text-[#99582A]" />
              {item.category}
            </h2>

            <div className="flex flex-col gap-4">
              {item.books.map((book, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedBook(book)}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-bold text-2xl hover:bg-gray-200 transition cursor-pointer"
                >
                  <FaBook className="text-blue-500" />
                  {book.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-15">
        <button className="bg-[#99582A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7a431f] transition">
          View More Categories
        </button>
      </div>

      {/* Popup */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[350px]">

            <h2 className="text-2xl font-bold text-center mb-5">
              {selectedBook.title}
            </h2>

            {/* Classes */}
            {selectedBook.classes.map((cls, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/flipPage", {
                    state: {
                      className: cls,
                      book: selectedBook.title,
                    },
                  })
                }
                className="bg-gray-100 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-200"
              >
                {cls}
              </div>
            ))}

            {/* Close */}
            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
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