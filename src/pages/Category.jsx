import React, { useState } from "react";
import { FaBook, FaFolderOpen } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedBook, setSelectedBook] = useState(null);

  const data = [
    {
      category: "Navbodh",
      books: [
        {
          title: "Book N1",
          classes: [
            "Class 1",
            "Class 2",
            "Class 3",
            "Class 4",
            "Class 5",
            "Class 6",
            "Class 7",
            "Class 8",
          ],
        },
        {
          title: "Book N2",
          classes: [
            "Class 1",
            "Class 2",
            "Class 3",
            "Class 4",
            "Class 5",
            "Class 6",
            "Class 7",
            "Class 8",
          ],
        },
      ],
    },

    {
      category: "Gyanbodh",
      books: [
        {
          title: "Book G1",
          classes: [
            "Class 1",
            "Class 2",
            "Class 3",
            "Class 4",
            "Class 5",
            "Class 6",
            "Class 7",
            "Class 8",
          ],
        },
        {
          title: "Book G2",
          classes: [
            "Class 1",
            "Class 2",
            "Class 3",
            "Class 4",
            "Class 5",
            "Class 6",
            "Class 7",
            "Class 8",
          ],
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
      <h1 className="text-3xl font-bold text-center pt-25  text-[#99582A]  mb-10 ">
        Categories
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center items-center gap-10   min-h-[40vh]">

        {data.map((item) => (
          <div
            key={item.category}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[300px]"
          >
            <h2 className="text-2xl font-bold flex justify-center items-center gap-2 mb-5">
              <FaFolderOpen className="text-[#99582A]" />
              {item.category}
            </h2>

            <div className="flex flex-col gap-4">
              {item.books.map((book, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setSelectedBook({
                      ...book,
                      category: item.category,
                    })
                  }
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-bold text-xl cursor-pointer hover:bg-gray-200"
                >
                  <FaBook className="text-blue-500" />
                  {book.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            if (location.state?.from === "agent") {
              navigate("/agentdashboard");
            } else {
              navigate("/dashboard");
            }
          }}
          className="bg-[#99582A] text-white px-6 py-3 rounded-xl font-bold"
        >
          Back
        </button>
      </div>

      {/* Popup */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-[350px]">

            <h2 className="text-2xl font-bold text-center mb-5">
              {selectedBook.title}
            </h2>

            {selectedBook.classes.map((cls, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/classpage", {
                    state: {
                      className: cls,
                      book: selectedBook.title,
                      category: selectedBook.category,
                    },
                  })
                }
                className="bg-gray-100 p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-200"
              >
                {cls}
              </div>
            ))}

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