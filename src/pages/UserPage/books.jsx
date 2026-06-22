import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
 const API = "http://localhost:3000/api/books";;
 function PdfCover({ pdfUrl, title }) {
  const [cover, setCover] = useState("");

  useEffect(() => {
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

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))];
  const booksByCategory = {
  Navbodh: ["Buddy", "Little Champ"],
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

    const res = await fetch(
      `http://localhost:3000/api/books/${editBook._id}`,
      {
        method: "PUT",
        body: formData,
      }
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

    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

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
        const res = await fetch(
          "https://flipbook-lw1b.onrender.com/api/books"
        );

        const data = await res.json();

        console.log("Books API Response:", data);

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
    <div className="min-h-screen  bg-[#EFE6DD] px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={() => navigate("/uploadBooks")}
          className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white text-lg sm:text-2xl px-8 py-3 rounded-xl font-semibold transition"
        >
          Upload Books
        </button>

        <div className="w-full   sm:w-auto bg-white border-2 border-[#572C10] rounded-xl px-5 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[#572C10] text-2xl font-bold">Total Books</p>
            <p className="text-[#572C10] text-2xl font-bold text-center">{totalBooks}</p>
          </div>
        </div>
      </div>
      {/* HEADING */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#572C10]">
          Explore Books
        </h1>

        <p className="text-[#572C10] mt-4 text-lg sm:text-2xl font-semibold">
          Find books by category, class and subject
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          
          <button
            onClick={handleSearch}
            className="w-full md:w-auto  text-[#572C10] text-lg sm:text-2xl px-8 py-3 rounded-xl font-semibold transition"
          >
            Search
          </button>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
     
         {/* CATEGORY */}
<select
  value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setSelectedBook("");
  }}
  className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
>
  <option value="">Category</option>
  <option value="Navbodh">Navbodh</option>
  <option value="Gyanbodh">Gyanbodh</option>
</select>

<select
  value={selectedBook}
  onChange={(e) => setSelectedBook(e.target.value)}
  disabled={!category}
  className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
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
  className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
  onChange={(e) => setClassName(e.target.value)}
>
  <option value="">Class</option>
<option value="Class 1">Nursery</option>
<option value="Class 1">LKG</option>
<option value="Class 1">UKG</option>
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
  className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
  onChange={(e) => setType(e.target.value)}
>
  <option value="">Type</option>

  <option value="Semester">Semester</option>
  <option value="Yearly">Yearly</option>
</select>

{/* SUBJECT */}
<select
  className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
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
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                {/* IMAGE */}
                <div className="h-62.5 sm:h-75 overflow-hidden">
               <PdfCover
  pdfUrl={book.fileUrl}
  title={book.title}
/>
                </div>
                
                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#572C10]">
                    {book.title}
                  </h2>

                  <p className="text-sm text-[#572C10] font-bold mt-1">
                    {book.author}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="bg-[#f3e7dd] text-[#572C10] text-xs font-bold px-3 py-2 rounded-full text-center">
                      {book.category}
                    </span>

                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-2 rounded-full text-center">
                      {getBookClasses(book).length > 0
                        ? getBookClasses(book).join(", ")
                        : book.className}
                    </span>

                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-full text-center">
                      {book.subject}
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-2 rounded-full text-center">
  {book.type}
</span>
                  </div>

                  <p className="text-sm text-[#572C10] font-bold mt-3 ">
                    {book.description}
                  </p>
                  <div className="flex justify-between mt-5">
  {/* EDIT BUTTON */}
  <button
   onClick={() => setEditBook(book)}
    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
  >
    <FaEdit />
    Edit
  </button>

  {/* DELETE BUTTON */}
  <button
    onClick={() => handleDelete(book._id)}
    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
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
          <div className="text-center mt-20">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#572C10]">
              No Books Found
            </h2>

            <p className="text-[#572C10] mt-2 font-bold">
              Try changing filters or search text
            </p>
            
          </div>
        )}
      </div>
      {editBook && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[92%] max-w-lg rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="bg-linear-to-r from-blue-500 to-purple-500 px-6 py-5">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="bg-white/20 p-3 rounded-full">

              <FaEdit className="text-white text-xl"/>

            </div>

            <h2 className="text-2xl font-bold text-white">

              Edit Book

            </h2>

          </div>

          <button

            onClick={() => setEditBook(null)}

            className="text-white text-xl"

          >

            <FaTimes/>

          </button>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {/* Title */}

        <div className="mb-4">

          <label className="text-sm font-semibold text-gray-600">

            Title

          </label>

          <input

            value={editBook.title}

            onChange={(e) =>
              setEditBook({
                ...editBook,
                title: e.target.value,
              })
            }

            className="
            w-full
            mt-2
            border-2
            border-gray-200
            rounded-xl
            p-3

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100

            outline-none
            transition
            "
          />

        </div>

        {/* Description */}

        <div className="mb-4">

          <label className="text-sm font-semibold text-gray-600">

            Description

          </label>

          <textarea

            rows="4"

            value={editBook.description}

            onChange={(e) =>
              setEditBook({
                ...editBook,
                description: e.target.value,
              })
            }

            className="
            w-full
            mt-2
            border-2
            border-gray-200
            rounded-xl
            p-3

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100

            outline-none
            transition
            "
          />

        </div>

        {/* Category */}

        <div className="mb-6">

          <label className="text-sm font-semibold text-gray-600">

            Category

          </label>

          <input

            value={editBook.category}

            onChange={(e) =>
              setEditBook({
                ...editBook,
                category: e.target.value,
              })
            }

            className="
            w-full
            mt-2
            border-2
            border-gray-200
            rounded-xl
            p-3

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100

            outline-none
            transition
            "
          />

        </div>
        {/* Upload New Cover */}
<div className="mb-6">

  <label className="text-sm font-semibold text-gray-600">
    Upload New Cover (PNG / JPG)
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/jpg"
    onChange={(e) => setNewImage(e.target.files[0])}
    className="
      w-full
      mt-2
      border-2
      border-dashed
      border-gray-300
      rounded-xl
      p-3
      cursor-pointer
      hover:border-blue-500
      transition
    "
  />

</div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button

            onClick={handleUpdate}

            className="
            flex-1
            bg-green-500
            hover:bg-green-600

            text-white

            py-3

            rounded-xl

            flex

            items-center

            justify-center

            gap-2

            transition
            "
          >

            <FaCheck />

            Update

          </button>

          <button

            onClick={() => setEditBook(null)}

            className="
            flex-1

            bg-red-500

            hover:bg-red-600

            text-white

            py-3

            rounded-xl

            flex

            items-center

            justify-center

            gap-2

            transition
            "
          >

            <FaTimes />

            Cancel

          </button>

        </div>

      </div>

    </div>

  </div>
)}

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pb-10">
        <button
          onClick={() => navigate("/viewMoreBooks")}
          className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white px-6 sm:px-8 py-3 rounded-xl text-lg sm:text-2xl shadow-md transition">
          View More
        </button>

        <button
          onClick={() =>navigate("/dashboard")}
          className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white px-6 sm:px-8 py-3 rounded-xl text-lg sm:text-2xl shadow-md transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Books;