import Book from "../models/Book.js";

// =========================
// GET ALL BOOKS
// =========================
export const getBooks = async (req, res) => {
  try {
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

    // =========================
    // PDF
    // =========================
    if (req.files?.file?.[0]) {
      console.log("PDF FILE:", req.files.file[0]);

      pdfUrl = req.files.file[0].path;

      console.log("PDF URL:", pdfUrl);
    } else {
      console.log("❌ PDF NOT RECEIVED");
    }

    // =========================
    // IMAGE
    // =========================
    if (req.files?.img?.[0]) {
      console.log("IMAGE FILE:", req.files.img[0]);

      imageUrl = req.files.img[0].path;

      console.log("IMAGE URL:", imageUrl);
    }

    console.log("Creating Book Document...");

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

    console.log("Saving Book...");

    const saved = await newBook.save();

    console.log("✅ BOOK SAVED SUCCESSFULLY");

    return res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: saved,
    });

  } catch (err) {
    console.error("============== ERROR ==============");
    console.error(err);
    console.error(err.stack);

    return res.status(500).json({
      success: false,
      message: err.message,
      error: err.stack,
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
      subject: req.body.subject,
      type: req.body.type,
    };

    if (req.files?.img?.[0]) {
      updateData.img = req.files.img[0].path;
    }

    if (req.files?.file?.[0]) {
      updateData.fileUrl = req.files.file[0].path;
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
    console.error(err);

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
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};