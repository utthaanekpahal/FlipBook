import Book from "../models/Book.js";

// =========================
// Upload Book
// =========================
const uploadBook = async (req, res) => {
  try {
    console.log("========== UPLOAD REQUEST ==========");
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("===================================");

    const {
      title,
      author,
      description,
      img,
      category,
      className,
      type,
      subject,
    } = req.body;

    // Check PDF
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
        body: req.body,
        file: req.file || null,
      });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      img,
      category,
      className,
      type,
      subject,
      fileUrl: req.file.path,
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

export { uploadBook, getBooks };