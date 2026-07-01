import Book from "../models/Book.js";

// =========================
// GET ALL BOOKS
// =========================
export const getBooks = async (req, res) => {
  try {
    console.log("FILES:", req.files);
console.log("BODY:", req.body);
    const books = await Book.find();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// CREATE BOOK (UPLOAD PDF + IMAGE)
// =========================
export const uploadBooks = async (req, res) => {
  try {
    console.log("========== UPLOAD START ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      title,
      description,
      category,
      className,
      subject,
      type,
    } = req.body;

    let pdfUrl = "";
    let imageUrl = "";

    if (req.files?.file?.[0]) {
      pdfUrl = req.files.file[0].path;
      console.log("PDF URL:", pdfUrl);
    } else {
      console.log("❌ PDF NOT RECEIVED");
    }

    if (req.files?.img?.[0]) {
      imageUrl = req.files.img[0].path;
      console.log("IMAGE URL:", imageUrl);
    }

    console.log("Creating Book...");

    const newBook = new Book({
      title,
      description,
      category,
      className,
      subject,
      type,
      fileUrl: pdfUrl,
      img: imageUrl,
    });

    const saved = await newBook.save();

    console.log("✅ BOOK SAVED");

    return res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: saved,
    });

  } catch (err) {
    console.error("❌ UPLOAD ERROR");
    console.error(err);
    console.error(err.stack);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};