import Book from "../models/Book.js";

// =========================
// Upload Book
// =========================
const uploadBook = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const {
      title,
      author,
      description,
      img,
      category,
      book,       // ✅ Added
      className,
      subject,
    } = req.body;

    const newBook = await Book.create({
      title,
      author,
      description,
      img,

      category,
      book,       // ✅ Added
      className,
      subject,

      type: "pdf",

      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: newBook,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Books
// =========================
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      data: books,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Categories
// =========================
const getCategories = async (req, res) => {
  try {
    const books = await Book.find();

    const grouped = {};

    books.forEach((item) => {
      const category = item.category || "Unknown";
      const book = item.book || "Unknown";
      const className = item.className || "Unknown";

      if (!grouped[category]) {
        grouped[category] = {};
      }

      if (!grouped[category][book]) {
        grouped[category][book] = {};
      }

      if (!grouped[category][book][className]) {
        grouped[category][book][className] = [];
      }

      grouped[category][book][className].push(item);
    });

    res.status(200).json({
      success: true,
      data: grouped,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  uploadBook,
  getBooks,
  getCategories,
};