import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import useApiLoader from "../../hook/useApiLoader";


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
 const API = "https://flipbook-1-l2tf.onrender.com/api/books";;
 function PdfCover({ pdfUrl, title }) {
  const [cover, setCover] = useState("");

  useEffect(() => {
      console.log("PDF URL =", pdfUrl);
    const loadCover = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({
          scale: 0.5,
        });

        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        setCover(canvas.toDataURL("image/jpeg"));
      } catch (err) {
        console.log(err);
      }
    };

    if (pdfUrl) {
      loadCover();
    }
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
      const { loading, execute } = useApiLoader();
  

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))];
  const booksByCategory = {
  Navbodh: ["Buddy", "Little Lamp"],
  Gyanbodh: ["Deep Dives", "Hearing Bee"],
};
  const totalBooks = books.length;
const subjects = [...new Set(books.map((b) => b.subject).filter(Boolean))];
  const [category, setCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [className, setClassName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");
const [editBook, setEditBook] = useState(null);
const [newImage, setNewImage] = useState(null);
  const getBookClasses = (book) => {
    if (Array.isArray(book.classNames) && book.classNames.length > 0) {
      return book.classNames;
    }

    if (typeof book.className === "string" && book.className.trim()) {
      return book.className
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

const handleUpdate = async () => {
  if (!editBook?._id) return;

  try {
    const formData = new FormData();

    formData.append("title", editBook.title);
    formData.append("description", editBook.description);
    formData.append("category", editBook.category);

    formData.append("className", editBook.className);
    formData.append("subject", editBook.subject);
    formData.append("type", editBook.type);

    if (newImage) {
      formData.append("img", newImage);
    }

    const res = await execute(() =>
  fetch(
    `https://flipbook-1-l2tf.onrender.com/api/books/${editBook._id}`,
    {
      method: "PUT",
      body: formData,
    }
  )
);

    const data = await res.json();

    if (data.success) {
      const updated = books.map((b) =>
        b._id === editBook._id ? data.data : b
      );

      setBooks(updated);
      setFilteredBooks(updated);

      setEditBook(null);
      setNewImage(null);

      alert("Book updated successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
const handleDelete = async (id) => {
  try {
    console.log("Deleting ID:", id);

    const res = await execute(() =>
  fetch(`${API}/${id}`, {
    method: "DELETE",
  })
);
    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log("NOT JSON RESPONSE");
      alert("Server error: not JSON response");
      return;
    }

    if (data.success) {
      const updated = books.filter((b) => b._id !== id);
      setBooks(updated);
      setFilteredBooks(updated);
      alert("Book deleted successfully");
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (error) {
    console.log("Delete Error:", error);
    alert("Delete failed");
  }
};
  // fetch books
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await execute(() =>
        fetch("https://flipbook-1-l2tf.onrender.com/api/books")
      );

      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
        setFilteredBooks(data.data);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  fetchBooks();
}, []);
  // search logic
  const handleSearch = () => {
  const result = books.filter((book) => {
    return (
      // Category Filter
      (category === "" ||
        book.category?.trim().toLowerCase() ===
          category.trim().toLowerCase()) &&

      // Book Filter
      (selectedBook === "" ||
        book.title?.trim().toLowerCase() ===
          selectedBook.trim().toLowerCase()) &&

      // Class Filter
      (className === "" ||
        book.className?.trim().toLowerCase() ===
          className.trim().toLowerCase()) &&

      // Type Filter
      (type === "" ||
        book.type?.trim().toLowerCase() ===
          type.trim().toLowerCase()) &&

      // Subject Filter
      (subject === "" ||
        book.subject?.trim().toLowerCase() ===
          subject.trim().toLowerCase()) &&

      // Search Text
      (search === "" ||
        book.title?.toLowerCase().includes(search.toLowerCase()))
    );
  });

  setFilteredBooks(result);
};

  return (
  <div className="min-h-screen mt-[-35px] bg-gradient-to-br from-[#EFE6DD] px-4 sm:px-6 py-10">

  {/* TOP BAR */}
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

    <button
      onClick={() => navigate("/uploadBooks")}
      className="w-full sm:w-auto bg-gradient-to-r from-[#572C10] to-[#3d1f0a] text-white text-lg sm:text-xl px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      Upload Books
    </button>

    <div className="w-full sm:w-auto bg-white/70 backdrop-blur-md border border-[#572C10]/30 rounded-2xl px-6 py-4 shadow-md flex items-center justify-center sm:justify-between">
      <div className="text-center">
        <p className="text-[#572C10] text-lg font-semibold">Total Books</p>
        <p className="text-[#572C10] text-3xl font-extrabold">{totalBooks}</p>
      </div>
    </div>

  </div>

  {/* HEADING */}
  <div className="text-center mb-5">
    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#572C10] tracking-tight">
      Explore Books
    </h1>
    <p className="text-[#572C10]/80 mt-4 text-base sm:text-xl font-medium">
      Find books by category, class and subject
    </p>
  </div>

  {/* FILTER CARD */}
  <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl p-5 sm:p-8 rounded-3xl shadow-xl border border-white/40">

    {/* SEARCH ROW */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white text-lg px-8 py-3 rounded-xl font-semibold shadow-md transition"
      >
        Search
      </button>

    </div>

    {/* FILTER GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSelectedBook("");
        }}
        className="bg-white border border-[#572C10]/30 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#572C10] outline-none"
      >
        <option value="">Category</option>
        <option value="Navbodh">Navbodh</option>
        <option value="Gyanbodh">Gyanbodh</option>
      </select>

      {/* BOOK NAME */}
      <select
        value={selectedBook}
        onChange={(e) => setSelectedBook(e.target.value)}
        disabled={!category}
        className="bg-white border border-[#572C10]/30 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#572C10] outline-none disabled:opacity-50"
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
        className="bg-white border border-[#572C10]/30 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#572C10] outline-none"
        onChange={(e) => setClassName(e.target.value)}
      >
        <option value="">Class</option>
        <option value="Nursery">Nursery</option>
        <option value="LKG">LKG</option>
        <option value="UKG">UKG</option>
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
        <option value="Class 11">Class 11</option>
        <option value="Class 12">Class 12</option>
      </select>

      {/* TYPE */}
      <select
        className="bg-white border border-[#572C10]/30 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#572C10] outline-none"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Type</option>
        <option value="Semester">Semester</option>
        <option value="Yearly">Yearly</option>
      </select>

      {/* SUBJECT */}
      <select
        className="bg-white border border-[#572C10]/30 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#572C10] outline-none sm:col-span-2 md:col-span-1"
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Subject</option>
        {subjects.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

    </div>
  </div>

  {/* BOOK GRID */}
  <div className="max-w-6xl mx-auto mt-14 mb-10">

{loading ? (
  <div className="flex justify-center py-20">
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
            className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition"
          >

            {/* COVER */}
            <div className="h-64 sm:h-72 overflow-hidden">
              <PdfCover pdfUrl={book.fileUrl} title={book.title} />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-bold text-[#572C10]">
                {book.title}
              </h2>

              <p className="text-sm text-[#572C10]/80 font-semibold mt-1">
                {book.author}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">

                <span className="bg-[#f3e7dd] text-[#572C10] text-xs font-bold px-3 py-1 rounded-full">
                  {book.category}
                </span>

                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                  {getBookClasses(book).length > 0
                    ? getBookClasses(book).join(", ")
                    : book.className}
                </span>

                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  {book.subject}
                </span>

                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                  {book.type}
                </span>

              </div>

              <p className="text-sm text-[#572C10]/80 font-medium mt-3">
                {book.description}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between mt-5 gap-3">

                <button
                  onClick={() => setEditBook(book)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    ) : (
      <div className="text-center mt-24">
        <h2 className="text-2xl font-semibold text-[#572C10]">
          No Books Found
        </h2>
        <p className="text-[#572C10]/70 mt-2 font-medium">
          Try changing filters or search text
        </p>
      </div>
    )}

  </div>

  {/* EDIT MODAL (UI ONLY IMPROVED) */}
  {editBook && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <FaEdit className="text-white text-xl" />
            <h2 className="text-xl font-bold text-white">Edit Book</h2>
          </div>

          <button onClick={() => setEditBook(null)} className="text-white text-xl">
            <FaTimes />
          </button>

        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* SAME INPUTS (unchanged logic) */}
          <input
            value={editBook.title}
            onChange={(e) =>
              setEditBook({ ...editBook, title: e.target.value })
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            rows="4"
            value={editBook.description}
            onChange={(e) =>
              setEditBook({ ...editBook, description: e.target.value })
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            value={editBook.category}
            onChange={(e) =>
              setEditBook({ ...editBook, category: e.target.value })
            }
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full border border-dashed p-3 rounded-xl"
          />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">

            <button
              onClick={handleUpdate}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FaCheck />
              Update
            </button>

            <button
              onClick={() => setEditBook(null)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FaTimes />
              Cancel
            </button>

          </div>

        </div>

      </div>
    </div>
  )}

  {/* FOOTER BUTTONS */}
  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pb-10">

    <button
      onClick={() => navigate("/viewMoreBooks")}
      className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white px-8 py-3 rounded-2xl text-lg shadow-lg transition"
    >
      View More
    </button>

    <button
      onClick={() => navigate("/dashboard")}
      className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white px-8 py-3 rounded-2xl text-lg shadow-lg transition"
    >
      Back
    </button>

  </div>

</div>
  );
};

export default Books;