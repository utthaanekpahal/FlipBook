import Book from "../models/Book.js";

// =========================
// GET ALL BOOKS
// =========================
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    console.error("GET BOOKS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// CREATE BOOK (UPLOAD PDF)
// =========================
export const uploadBooks = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      className,
      subject,
      type,
    } = req.body;

    // validation
    if (!title || !category || !className || !subject || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    // PDF URL
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newBook = new Book({
      title: title.trim(),
      description: description || "",
      category: category.trim(),
      className: className.trim(),
      subject: subject.toLowerCase().trim(), // IMPORTANT FIX
      type,

      fileUrl,
      img: "", // optional (not used now)
    });

    const saved = await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: saved,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// UPDATE BOOK
// =========================
export const updateBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      className: req.body.className,
      subject: req.body.subject?.toLowerCase(),
      type: req.body.type,
    };

    // if new PDF uploaded
    if (req.file) {
      updateData.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// DELETE BOOK
// =========================
export const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};