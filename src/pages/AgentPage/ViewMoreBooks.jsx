import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewMoreBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();
        setBooks(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen rounded-xl lg:ml-[10px] lg:mt-[7%] sm:mt-[10%] mt-[40%] bg-[#f5f5f5] px-4 py-10">
      <h1 className="text-center text-4xl font-bold text-[#572C10] mb-10">
        All Books
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg text-[#572C10]">
                {book.title}
              </h2>

              <p className="text-sm text-[#572C10] font-bold">
                {book.author}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-[#f3e7dd] px-3 py-1 rounded-full text-xs">
                  {book.category}
                </span>

                <span className="bg-green-100 px-3 py-1 rounded-full text-xs">
                  {book.subject}
                </span>

                <span className="bg-blue-100 px-3 py-1 rounded-full text-xs">
                  {book.className}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#572C10] text-white px-8 py-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewMoreBooks;