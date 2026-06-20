import Book from "../models/Book.js";

// =========================
// GET ALL BOOKS
// =========================
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

<<<<<<< Updated upstream
    res.json({
      success: true,
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// UPLOAD BOOK
// =========================
export const uploadBooks = async (req, res) => {
  try {
    const { title, description, category, className, subject, type } = req.body;

    let imgUrl = "";
    let fileUrl = "";

    if (req.files?.img) {
      imgUrl = `${req.protocol}://${req.get("host")}/uploads/${req.files.img[0].filename}`;
    }

    if (req.files?.file) {
      fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.files.file[0].filename}`;
    }

    const book = await Book.create({
=======
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    const {
>>>>>>> Stashed changes
      title,
      description,
      category,
      className,
      subject,
      type,
      img: imgUrl,
      fileUrl,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// UPDATE BOOK (FIXED)
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

    // ✅ IMPORTANT FIX (single file middleware use ho raha hai)
    if (req.file) {
      updateData.img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
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

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
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

    await Book.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};