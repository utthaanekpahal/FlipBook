import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApiLoader from "../../hook/useApiLoader";
const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, execute } = useApiLoader();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  
  const [category, setCategory] = useState("");
  const [className, setClassName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");

  const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook._id, // 👈 ADD THIS (important for frontend)
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await execute(() =>
  fetch("https://flipbook-lw1b.onrender.com/api/books")
);        const data = await res.json();

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
    <div className="min-h-screen lg:mt-[4%] sm:mt-[4%] mt-[25%] bg-[#EFE6DD] px-4 sm:px-6 py-10">
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
          <input
            type="text"
            placeholder="Search book title..."
            className="flex-1 border border-[#572C10] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white text-lg sm:text-2xl px-8 py-3 rounded-xl font-semibold transition"
          >
            Search
          </button>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* CATEGORY */}
          <select
            className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Navbodh">Navbodh</option>
            <option value="Gyanbodh">Gyanbodh</option>
          </select>

          {/* CLASS */}
          <select
            className="border border-[#572C10] px-3 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#572C10]"
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
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
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
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
        Loading books...
      </span>
    </div>
  </div>
  ) : filteredBooks.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
      {filteredBooks.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          {/* IMAGE */}
          <div className="h-[250px] sm:h-[300px] overflow-hidden">
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/book1.jpg";
              }}
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
                {book.className}
              </span>

              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-2 rounded-full text-center">
                {book.subject}
              </span>
            </div>

            <p className="text-sm text-[#572C10] font-bold mt-3 line-clamp-2">
              {book.description}
            </p>
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
      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pb-10">
        <button
          onClick={() => navigate("/agent/viewMoreBooks")}
          className="w-full sm:w-auto bg-[#572C10] hover:bg-[#3d1f0a] text-white px-6 sm:px-8 py-3 rounded-xl text-lg sm:text-2xl shadow-md transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Books;