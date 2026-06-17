import React, { useState } from "react";
import { FaBook, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const initialData = [
  {
    category: "Navbodh",
    icon: "/nav.png",
    books: [
      {
        title: "Book N1",
        classes: ["Class 1", "Class 2", "Class 3"]
      },
      {
        title: "Book N2",
        classes: ["Class 4", "Class 5"]
      },
    ],
  },

  {
    category: "Gyanbodh",
    icon: "/gyan.png",
    books: [
      {
        title: "Book G1",
        classes: ["Class 1", "Class 2"]
      },
      {
        title: "Book G2",
        classes: ["Class 3", "Class 4"]
      },
    ],
  },
];

const CLASSES = [
  "Class 1","Class 2","Class 3","Class 4",
  "Class 5","Class 6","Class 7","Class 8",
];

const Category = () => {
  const navigate = useNavigate();
const [data, setData] = useState(() => {
  const saved = localStorage.getItem("categories");
  return saved ? JSON.parse(saved) : initialData;
});
  const [selectedBook, setSelectedBook] = useState(null);

  // ADD FORM
  const [showForm, setShowForm] = useState(false);
 const [form, setForm] = useState({
  category: "",
  book: "",
  icon: "",
  classes: "",
});

  // ================= ADD FUNCTION =================
 const handleAdd = () => {

  const updated = [...data];

  const catIndex = updated.findIndex(
    (c) =>
      c.category.toLowerCase() ===
      form.category.toLowerCase()
  );

 const newBook = {

  title: form.book,

  classes: form.classes
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean),

};
  if (catIndex !== -1) {

    updated[catIndex].books.push(newBook);

  } else {

    updated.push({

      category: form.category,

      icon: form.icon || "/nav.png",

      books: form.book
        ? [newBook]
        : [],

    });

  }

  setData(updated);

  localStorage.setItem("categories", JSON.stringify(updated));

  setShowForm(false);

  setForm({

    category: "",

    book: "",

    icon: "",

    classes: "",

  });

};

  // ================= DELETE CATEGORY =================
const deleteBook = (category, bookTitle) => {
  const confirmDelete = window.confirm(
    `Delete "${bookTitle}" book?`
  );

  if (!confirmDelete) return;

  setData((prevData) =>
    prevData.map((item) => {
      if (item.category === category) {
        return {
          ...item,
          books: item.books.filter(
            (book) => book.title !== bookTitle
          ),
        };
      }
      return item;
    })
  );
};
  // ================= EDIT CATEGORY =================
 const editCategory = (cat) => {
  const newName = prompt("Edit Category Name", cat);
  if (!newName) return;

  setData(
    data.map((c) =>
      c.category === cat ? { ...c, category: newName } : c
    )
  );
};

const editBook = (category, oldTitle) => {
  const newTitle = prompt("Enter new book name", oldTitle);
  if (!newTitle) return;

  setData(
    data.map((item) => {
      if (item.category === category) {
        return {
          ...item,
          books: item.books.map((book) =>
            book.title === oldTitle
              ? { ...book, title: newTitle }
              : book
          ),
        };
      }
      return item;
    })
  );
};

  return (
    <div
      className="min-h-screen ml-3.75 rounded-xl bg-cover bg-center px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: "url('/background img.png')" }}
    >

      {/* TOP ADD BUTTON */}
      <div className="flex justify-end pt-5">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center pt-10 text-[#99582A] mb-10">
        Categories
      </h1>

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

            <h2 className="text-xl font-bold mb-4">Add Category / Book</h2>

            <input
              placeholder="Category"
              className="w-full border p-2 mb-3"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              placeholder="Book "
              className="w-full border p-2 mb-3"
              value={form.book}
              onChange={(e) =>
                setForm({ ...form, book: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setForm({
                    ...form,
                    icon: URL.createObjectURL(file)
                  });
                }
              }}
            />

            <input
              type="text"
              placeholder="Classes (eg. Class 1, Class 2, Class 3)"
              className="w-full border p-2 mb-3"
              value={form.classes}
              onChange={(e) =>
                setForm({
                  ...form,
                  classes: e.target.value
                })
              }
            />

            <button
              onClick={handleAdd}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-red-500 text-white w-full py-2 mt-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* CATEGORY CARDS  */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10">
        {data.map((item) => (
          <div
            key={item.category}
            className="bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-2xl w-full sm:w-[320px]"
          >

            {/* CATEGORY HEADER (UNCHANGED UI) */}
            <div className="flex items-center justify-between mb-6">
              
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <img
                  src={item.icon}
                  className="w-12 h-12 rounded-full border-2 border-[#99582A]"
                />
                {item.category}
              </h2>

              {/* EDIT DELETE */}
            <div className="flex gap-2">

  {/* EDIT CATEGORY */}
  <FaEdit
    className="text-blue-600 cursor-pointer"
    onClick={() => {
      const newName = prompt("Edit category name", item.category);
      if (!newName) return;

      setData(
        data.map((c) =>
          c.category === item.category
            ? { ...c, category: newName }
            : c
        )
      );
    }}
  />

  {/* DELETE CATEGORY */}
  <FaTrash
    className="text-red-600 cursor-pointer"
    onClick={() => {
      const confirmDelete = window.confirm(
        `Delete category "${item.category}"?`
      );

      if (!confirmDelete) return;

      setData(
        data.filter((c) => c.category !== item.category)
      );
    }}
  />

</div>

            </div>

            {/* BOOK LIST (UNCHANGED UI) */}
            <div className="flex flex-col gap-4">
              {item.books.map((book) => (
                <div
                  key={book.title}
                  className="flex items-center justify-between bg-white/80 p-3 rounded-xl font-bold"
                >
                  {/* OPEN BOOK */}
                  <div
                    onClick={() =>
                      setSelectedBook({
                        ...book,
                        category: item.category,
                      })
                    }
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <FaBook className="text-blue-500" />
                    {book.title}
                  </div>

                  {/* EDIT & DELETE BUTTONS */}
                  <div className="flex gap-2">
                    {/* EDIT BUTTON */}
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() =>
                        editBook(item.category, book.title)
                      }
                    />

                    {/* DELETE BUTTON */}
                    <FaTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() =>
                        deleteBook(item.category, book.title)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* CLASS POPUP */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-2xl w-[90%] sm:w-100">

            <h2 className="text-xl font-bold text-center mb-4">
              {selectedBook.title}
            </h2>

            {selectedBook.classes?.length ? (
              selectedBook.classes.map((cls) => (
                <div
                  key={cls}
                  onClick={() =>
                    navigate("/classpage", {
                      state: {
                        className: cls,
                        book: selectedBook.title,
                        category: selectedBook.category,
                      },
                    })
                  }
                  className="bg-gray-100 p-3 mb-2 rounded cursor-pointer"
                >
                  {cls}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No classes available
              </p>
            )}

            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-3 bg-[#99582A] text-white p-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#99582A] text-white px-8 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default Category;