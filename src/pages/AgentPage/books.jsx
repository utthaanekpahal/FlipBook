import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApiLoader from "../../hook/useApiLoader";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// =====================
// PDF COVER FUNCTION
// =====================
const getPdfCover = async (pdfUrl) => {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.7 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    return canvas.toDataURL("image/jpeg");
  } catch (err) {
    console.log("PDF COVER ERROR:", err);
    return "/book1.jpg";
  }
};

const Books = () => {
  const navigate = useNavigate();
  const { loading, execute } = useApiLoader();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [covers, setCovers] = useState({}); //

  const [category, setCategory] = useState("");
  const [className, setClassName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");

  // =====================
  // FETCH + COVER LOAD
  // =====================
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await execute(() =>
          fetch("https://flipbook-lw1b.onrender.com/api/books")
        );

        const data = await res.json();

        if (data.success) {
          setBooks(data.data);
          setFilteredBooks(data.data);

          // ✅ GENERATE COVERS
          const coverMap = {};

          for (let book of data.data) {
            if (book.fileUrl) {
              coverMap[book._id] = await getPdfCover(book.fileUrl);
            }
          }

          setCovers(coverMap);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchBooks();
  }, []);

  // =====================
  // SEARCH FILTER
  // =====================
  const handleSearch = () => {
    const result = books.filter((book) => {
      return (
        (category === "" ||
          book.category?.toLowerCase() === category.toLowerCase()) &&
        (className === "" ||
          book.className?.toLowerCase() === className.toLowerCase()) &&
        (type === "" ||
          book.type?.toLowerCase() === type.toLowerCase()) &&
        (subject === "" ||
          book.subject?.toLowerCase() === subject.toLowerCase()) &&
        (search === "" ||
          book.title?.toLowerCase().includes(search.toLowerCase()))
      );
    });

    setFilteredBooks(result);
  };

  return (
    <div className="min-h-screen bg-[#EFE6DD] px-4 py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#572C10]">
          Explore Books
        </h1>
      </div>

      {/* FILTER */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">

        <div className="flex gap-4 mb-4">
          <input
            className="flex-1 border px-4 py-3 rounded-xl"
            placeholder="Search book..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-[#572C10] text-white px-6 py-3 rounded-xl"
          >
            Search
          </button>
        </div>

      </div>

      {/* BOOK GRID */}
      <div className="max-w-6xl mx-auto mt-12">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredBooks.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                {/* =====================
                    COVER IMAGE (NEW)
                ===================== */}
                <div className="h-[260px] w-full bg-gray-100">
                  <img
                    src={covers[book._id] || "/book1.jpg"}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#572C10]">
                    {book.title}
                  </h2>

                  <p className="text-sm font-bold text-gray-600">
                    {book.className}
                  </p>

                  <p className="text-sm text-green-600 font-semibold mt-2">
                    {book.subject}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="text-xs bg-[#f3e7dd] px-3 py-1 rounded-full">
                      {book.category}
                    </span>

                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {book.type}
                    </span>
                  </div>

                  <p className="text-sm mt-3 line-clamp-2 text-gray-600">
                    {book.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        ) : (
          <p className="text-center text-red-500">
            No Books Found
          </p>
        )}

      </div>

    </div>
  );
};

export default Books;