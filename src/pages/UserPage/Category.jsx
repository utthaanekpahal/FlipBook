import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import axios from "axios";
import useApiLoader from "../../hook/useApiLoader";


const sortClasses = (classes) => {
  const order = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  return [...classes].sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );
};

const Category = () => {
  const navigate = useNavigate();
  const { loading, execute } = useApiLoader();
  const [data, setData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

 useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await execute(() =>
        axios.get("http://localhost:3000/api/books")
      );

      const books = res.data.data;

      const grouped = {};

      books.forEach((item) => {
        if (!grouped[item.category]) {
          grouped[item.category] = {
            category: item.category,
            icon:
              item.category === "Navbodh"
                ? "/nav.png"
                : "/gyan.png",
            books: [],
          };
        }

        const existingBook = grouped[item.category].books.find(
          (b) => b.title === item.title
        );

        if (existingBook) {
          if (!existingBook.classes.includes(item.className)) {
            existingBook.classes.push(item.className);
          }

          existingBook.classes = sortClasses(
            existingBook.classes
          );
        } else {
          grouped[item.category].books.push({
            title: item.title,
            subject: item.subject,
            type: item.type,
            classes: [item.className],
          });
        }
      });

      setData(Object.values(grouped));
    } catch (err) {
      console.log(err);
    }
  };

  fetchBooks();
}, []);

  return (
    <div className="min-h-screen lg:ml-[35px] rounded-xl w-full lg:w-[97%] flex bg-[#faf6f2]">

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-10">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#3b2414]">
            Categories
          </h1>
          <div className="w-24 h-1 bg-[#99582A] rounded-full mx-auto mt-3"></div>
        </div>

        {/* CENTER WRAPPER */}
        <div className="w-full lg:ml-[33%] flex justify-center">
          <div className="w-full max-w-7xl">

            {/* GRID */}
            {loading ? (
   <div className="flex justify-center lg:mr-[30%] py-20">
    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
      <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
      <span className="text-[#572C10] font-medium">
        Loading Categories...
      </span>
    </div>
  </div>
) : ( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">

              {data.map((item) => (
                <div
                  key={item.category}
                  className="
                    w-full max-w-[360px]
                    bg-white
                    border border-[#eadfd3]
                    rounded-3xl
                    p-6
                    shadow-md
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all duration-300
                  "
                >

                  {/* HEADER */}
                  <div className="flex items-center gap-4 mb-6">

                    <div className="bg-[#f8ede3] p-2 rounded-2xl">
                      <img
                        src={item.icon}
                        className="w-12 h-12 object-contain"
                        alt=""
                      />
                    </div>

                    <h2 className="text-xl font-bold text-[#3b2414]">
                      {item.category}
                    </h2>

                  </div>

                  {/* BOOKS */}
                  <div className="flex flex-col gap-4">

                    {item.books.map((book) => (
                      <div
                        key={book.title}
                        onClick={() =>
                          setSelectedBook({
                            ...book,
                            category: item.category,
                          })
                        }
                        className="
                          flex items-center gap-3
                          bg-[#faf8f5]
                          border border-[#efe3d7]
                          p-4
                          rounded-2xl
                          cursor-pointer
                          hover:bg-[#fff7f0]
                          hover:border-[#99582A]
                          hover:shadow-md
                          transition-all duration-300
                        "
                      >

                        <div className="bg-[#99582A]/10 p-3 rounded-xl">
                          <FaBook className="text-[#99582A]" />
                        </div>

                        <span className="font-semibold text-[#3b2414]">
                          {book.title}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>
              ))}

            </div>
)}
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-gradient-to-r from-[#99582A] to-[#c98b4d]
              text-white
              px-12 py-3
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

      {/* MODAL */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4 z-50">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">

            <h2 className="text-2xl mb-3 font-bold text-center text-[#3b2414]">
              {selectedBook.title}
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">

              {selectedBook.classes?.length ? (
                selectedBook.classes.map((cls) => (
                  <div
                    key={cls}
                    onClick={() =>
                      navigate("/classpage", {
                        state: {
                          className: cls,
                          category: selectedBook.category,
                        },
                      })
                    }
                    className="
                      bg-[#faf8f5]
                      border border-[#e9ddd1]
                      p-4
                      rounded-2xl
                      cursor-pointer
                      text-center
                      hover:bg-[#99582A]
                      hover:text-white
                      transition-all
                    "
                  >
                    {cls}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No classes available
                </p>
              )}

            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="
                w-full mt-6
                bg-gradient-to-r from-[#99582A] to-[#c98b4d]
                text-white
                py-3
                rounded-2xl
                font-semibold
                shadow-md
                hover:scale-105
                transition-all
              "
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