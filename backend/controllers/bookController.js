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
    const { title, description, category, className, subject, type } =
      req.body;

    // -------------------------
    // VALIDATION (TEXT FIELDS)
    // -------------------------
    if (!title || !category || !className || !subject || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // -------------------------
    // FILE CHECK (IMPORTANT FIX)
    // multer.fields() → req.files
    // -------------------------
    if (!req.files || !req.files.file || !req.files.file[0]) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const pdfFile = req.files.file[0];

    // -------------------------
    // FILE URL
    // -------------------------
    // const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    //   pdfFile.filename
    // }`;

    const fileUrl = `${process.env.BACKEND_URL}/uploads/${pdfFile.filename}`;
    // -------------------------
    // CREATE BOOK
    // -------------------------
    const newBook = new Book({
      title: title.trim(),
      description: description || "",
      category: category.trim(),
      className: className.trim(),
      subject: subject.toLowerCase().trim(),
      type: type.trim(),
      fileUrl,
      img: "",
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

    // -------------------------
    // OPTIONAL NEW FILE UPDATE
    // -------------------------
    if (req.files && req.files.file && req.files.file[0]) {
      const pdfFile = req.files.file[0];

      updateData.fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${pdfFile.filename}`;
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