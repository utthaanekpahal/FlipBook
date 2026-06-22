import React, { useState, useEffect } from "react";
import { FaBook, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [data, setData] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);

  const [editingBook, setEditingBook] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showClassDropdown, setShowClassDropdown] =
    useState(false);

  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    classes: [],
  });

  // your useEffect here...
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/books");

      const books = res.data.data;

      const grouped = {};

      books.forEach((item) => {
        // Category create
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

        // Same title already exists?
        const existingBook =
          grouped[item.category].books.find(
            (b) => b.title === item.title
          );

        if (existingBook) {
          if (
            !existingBook.classes.includes(
              item.className
            )
          ) existingBook.classes.push(item.className);

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
  // ADD FORM

  // ================= ADD FUNCTION =================
 const handleAdd = () => {

  const updated = [...data];

 const catIndex = updated.findIndex(
  (c) =>
    c.category.replace(/\s+/g, "").toLowerCase() ===
    form.category.replace(/\s+/g, "").toLowerCase()
);

const newBook = {
  title: form.subcategory,
  type: "Semester",
  classes: sortClasses(form.classes),
};
  if (catIndex !== -1) {
  // ✅ existing category me add
  updated[catIndex].books.push(newBook);
} else {
  // ✅ new category auto create
  updated.push({
    category: form.category,
    icon: "/nav.png",
    books: [newBook],
  });
}

  setData(updated);

  localStorage.setItem("categories", JSON.stringify(updated));

  setShowForm(false);

  setForm({

    category: "",

    subcategory: "",

    classes: [],
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

const openEditBook = (category, book) => {
  setEditingBook({
    category,
    oldTitle: book.title,
    title: book.title,
    type: book.type || "Semester",
    classes: Array.isArray(book.classes) ? [...book.classes] : [],
  });
};

const toggleEditClass = (className) => {
  setEditingBook((current) => {
    if (!current) return current;

    const hasClass = current.classes.includes(className);
    return {
      ...current,
      classes: hasClass
        ? current.classes.filter((item) => item !== className)
        : [...current.classes, className],
    };
  });
};



const saveEditedBook = () => {
  if (!editingBook) return;

  const nextTitle = editingBook.title.trim();
  if (!nextTitle) return;

  setData((prevData) =>
    prevData.map((item) => {
      if (item.category !== editingBook.category) {
        return item;
      }

      return {
        ...item,
        books: item.books.map((book) =>
          book.title === editingBook.oldTitle
            ? {
                ...book,
                title: nextTitle,
                type: editingBook.type,
                classes: sortClasses(editingBook.classes),
              }
            : book
        ),
      };
    })
  );

  setEditingBook(null);
};

  return (
    <div
      className="min-h-screen ml-3.75 rounded-xl bg-cover bg-center px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: "url('/background img.png')" }}
    >

      {/* TOP ADD BUTTON */}
      <div className="flex justify-end pt-5">
        <button
          onClick={() => {
            setShowClassDropdown(false);
            setShowForm(true);
          }}
          className="group inline-flex items-center gap-3 rounded-full border border-[#99582A]/20 bg-linear-to-r from-[#99582A] via-[#c88b4f] to-[#f2c38b] px-5 py-3 text-white shadow-lg shadow-[#99582A]/25 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
            <FaPlus />
          </span>
          <span className="text-sm font-semibold tracking-wide">Add Category</span>
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

            <h2 className="text-xl font-bold mb-4">Add Category / Subcategory</h2>

            <input
              placeholder="Category"
              className="w-full border p-2 mb-3"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <input
              placeholder="Subcategory"
              className="w-full border p-2 mb-3"
              value={form.subcategory}
              onChange={(e) =>
                setForm({ ...form, subcategory: e.target.value })
              }
            />

            <div className="mb-3 relative">
              <button
                type="button"
                onClick={() => setShowClassDropdown((current) => !current)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left"
              >
                <span>
                  {form.classes.length
                    ? `${form.classes.length} class${form.classes.length > 1 ? "es" : ""} selected`
                    : "Select Classes"}
                </span>
                <span className="text-gray-500">▾</span>
              </button>

              {showClassDropdown && (
                <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-gray-700">Classes</p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          classes: [],
                        }))
                      }
                      className="text-xs font-medium text-red-500"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1">
                    {CLASS_OPTIONS.map((className) => (
                      <label
                        key={className}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.classes.includes(className)}
                          onChange={() =>
                            setForm((current) => {
                              const hasClass = current.classes.includes(className);
                              return {
                                ...current,
                                classes: hasClass
                                  ? current.classes.filter((item) => item !== className)
                                  : [...current.classes, className],
                              };
                            })
                          }
                        />
                        <span>{className}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowClassDropdown(false);
                handleAdd();
              }}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => {
                setShowClassDropdown(false);
                setShowForm(false);
              }}
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

  <div className="flex flex-col">

    {/* Book Name */}
    <span className="font-semibold text-[#572C10]">
      {book.title}
    </span>

    {/* Subject */}
{/* Subject */}

  </div>
</div>

                  {/* EDIT & DELETE BUTTONS */}
                  <div className="flex gap-2">
                    {/* EDIT BUTTON */}
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => openEditBook(item.category, book)}
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

      {/* BOOK EDIT POPUP */}
      {editingBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[520px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-center mb-4 text-[#99582A]">
              Edit Subcategory
            </h2>

            <input
              className="w-full border p-2 mb-3 rounded"
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  title: e.target.value,
                })
              }
              placeholder="Subcategory"
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              value={editingBook.type}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  type: e.target.value,
                })
              }
            >
              <option value="Semester">Semester</option>
              <option value="Yearly">Yearly</option>
            </select>

            <div className="mb-3">
              <p className="font-semibold mb-2">Classes</p>
              <div className="grid grid-cols-2 gap-2">
                {CLASS_OPTIONS.map((className) => (
                  <label
                    key={className}
                    className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={editingBook.classes.includes(className)}
                      onChange={() => toggleEditClass(className)}
                    />
                    <span>{className}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveEditedBook}
                className="bg-green-600 text-white w-full py-2 rounded"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditingBook(null)}
                className="bg-red-500 text-white w-full py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLASS POPUP */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-2xl w-[90%] sm:w-100">

            <h2 className="text-xl font-bold text-center mb-4">
              {selectedBook.title}
            </h2>
   <p className="text-center text-gray-600 mb-3">
        Subject : {selectedBook.subject}
      </p>

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