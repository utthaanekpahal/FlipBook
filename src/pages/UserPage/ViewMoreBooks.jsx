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
 <div className="min-h-screen lg:mt-[-18px] flex items-center justify-center p-4">

  {/* OUTER GLASS BACKDROP */}
  <div className="w-full max-w-7xl min-h-[90vh] bg-white/70 backdrop-blur-xl 
  rounded-xl shadow-2xl border border-white/40 overflow-hidden">

    {/* INNER PAGE */}
    <div className="min-h-full lg:ml-[15px] px-4 sm:px-6 py-10">

      {/* TITLE */}
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-[#3b1c08] mb-12 tracking-tight">
        All Books
      </h1>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden
            shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-72 overflow-hidden bg-gray-100">

              <img
                src={book.img}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="font-bold text-lg text-[#3b1c08] line-clamp-1">
                {book.title}
              </h2>

              <p className="text-sm text-gray-600 font-medium mt-1">
                {book.author}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">

                <span className="bg-[#f3e7dd] text-[#572C10] text-xs px-3 py-1 rounded-full font-semibold">
                  {book.category}
                </span>

                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {book.subject}
                </span>

                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {book.className}
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {book.description}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-14">

        <button
          onClick={() => navigate(-1)}
          className="px-10 py-3 rounded-2xl text-white font-semibold
          bg-gradient-to-r from-[#5A2D12] to-[#3b1c08]
          shadow-lg hover:scale-[1.03] transition"
        >
          Back
        </button>

      </div>

    </div>
  </div>
</div>
  );
};

export default ViewMoreBooks;