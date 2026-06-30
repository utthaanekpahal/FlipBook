import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiLoader from "../../hook/useApiLoader";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// ===================== PDF COVER =====================
function PdfCover({ pdfUrl, title }) {
  const [cover, setCover] = useState("");
  useEffect(() => {
    let isMounted = true;

    const loadCover = async () => {
      try {
        setCover("");

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        if (isMounted) {
          setCover(canvas.toDataURL("image/jpeg"));
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (pdfUrl) loadCover();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  return (
    <img
      src={cover || "/book1.jpg"}
      alt={title}
      className="w-full h-full object-cover"
    />
  );
}

const Books = () => {
  const navigate = useNavigate();
  const { execute } = useApiLoader();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
// 👇 ADD THIS
const [loading, setLoading] = useState(false);
  // filters
  const [category, setCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [className, setClassName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");

  const subjects = [...new Set(books.map((b) => b.subject).filter(Boolean))];

  const booksByCategory = {
    Navbodh: ["Buddy", "Little Champ"],
    Gyanbodh: ["Deep Dives", "Learning Bee"],
  };

  // ================= FETCH BOOKS =================
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await execute(() =>
        fetch("https://flipbook-production-b71a.up.railway.app/api/books")
      );

      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
        setFilteredBooks(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);

  // ================= SEARCH FILTER =================
  const handleSearch = () => {
  setLoading(true);

  setTimeout(() => {
    const result = books.filter((book) => {
      return (
        (category === "" ||
          book.category?.toLowerCase() === category.toLowerCase()) &&
        (selectedBook === "" ||
          book.title?.toLowerCase() === selectedBook.toLowerCase()) &&
        (className === "" ||
          book.className?.toLowerCase() === className.toLowerCase()) &&
        (type === "" ||
          book.type?.toLowerCase() === type.toLowerCase()) &&
        (subject === "" ||
          book.subject?.toLowerCase() === subject.toLowerCase())
      );
    });

    setFilteredBooks(result);
    setLoading(false);
  }, 300);
};

  return (
    <div className="min-h-screen mt-[36%] lg:mt-[4%] sm:mt-[5%] bg-[#EFE6DD] px-4 py-10">

      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#572C10]">
          Explore Books
        </h1>
      </div>

      {/* FILTER CARD */}
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl">

        {/* FILTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSelectedBook("");
            }}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Category</option>
            <option value="Navbodh">Navbodh</option>
            <option value="Gyanbodh">Gyanbodh</option>
          </select>

          {/* BOOK */}
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            disabled={!category}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Book Name</option>
            {category &&
              booksByCategory[category]?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          {/* CLASS */}
          <select
            onChange={(e) => setClassName(e.target.value)}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Class</option>
            <option value="Class 1">Nursery</option>
            <option value="Class 1">UKG</option>
            <option value="Class 1">LKG</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>

          {/* TYPE */}
          <select
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Type</option>
            <option value="Semester">Semester</option>
            <option value="Yearly">Yearly</option>
          </select>

          {/* SUBJECT */}
          <select
            onChange={(e) => setSubject(e.target.value)}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Subject</option>
            {subjects.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

        </div>

        {/* SEARCH BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-[#572C10] text-white px-10 py-3 rounded-xl font-semibold"
          >
            Search
          </button>
        </div>

      </div>

      {/* BOOK GRID */}
      <div className="max-w-6xl mx-auto mt-10">

  {loading ? (
   <div className="flex justify-center  py-20">
    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
      <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
      <span className="text-[#572C10] font-medium">
        Loading Books...
      </span>
    </div>
  </div>
  ) : filteredBooks.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredBooks.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-3xl shadow-md overflow-hidden"
        >
          <div className="h-64">
            <PdfCover pdfUrl={book.fileUrl} title={book.title} />
          </div>

          <div className="p-5">
            <h2 className="text-xl font-bold text-[#572C10]">
              {book.title}
            </h2>

            <p className="text-sm mt-2">{book.subject}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                {book.category}
              </span>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                {book.className}
              </span>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                {book.type}
              </span>
            </div>

            <p className="text-sm mt-3 line-clamp-2">
              {book.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-red-500 mt-10">
      No Books Found
    </p>
  )}
</div>

    </div>
  );
};

export default Books;