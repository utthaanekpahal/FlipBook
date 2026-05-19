import React from "react";
import { FaBook, FaFolderOpen } from "react-icons/fa";

const Category = () => {
  const data = [
    {
      category: "Navbodh",
      books: ["Book N1", "Book N2"],
    },
    {
      category: "Gyanbodh",
      books: ["Book G1", "Book G2"],
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
      <h1 className="text-4xl font-bold flex justify-center text-[#99582A] mb-10 p-20 ">
        Categories
      </h1>

      <div className="flex gap-10 justify-center flex-wrap ">
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
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-bold text-2xl hover:bg-gray-200 transition"
                >
                  <FaBook className="text-blue-500" />
                  {book}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-15">
        <button className="bg-[#99582A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7a431f] transition">
          View More Categories
        </button>
      </div>
    </div>
  );
};

export default Category;