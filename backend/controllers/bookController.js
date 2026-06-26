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
    res.status(500).json({ success: false, message: err.message });
  }
};



// =========================
// UPLOAD BOOK (FIXED)
// =========================
export const uploadBooks = async (req, res) => {
  try {
     console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, description, category, className, subject, type } = req.body;

    // ✅ VALIDATION
    if (!title || !category || !className || !subject || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ FILE CHECK (IMPORTANT FIX)
    const pdfFile = req.files?.file?.[0];

    if (!pdfFile) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required (form-data key: file)",
      });
    }

    // ✅ SAFE URL (WORKS IN LOCAL + RENDER)
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${pdfFile.filename}`;

    const imgFile = req.files?.img?.[0];
    const imgUrl = imgFile
      ? `${req.protocol}://${req.get("host")}/uploads/${imgFile.filename}`
      : "";

    // ✅ SAVE IN DB
    const newBook = new Book({
      title: title.trim(),
      description: description || "",
      category: category.trim(),
      className: className.trim(),
      subject: subject.trim(),
      type: type.trim(),

      fileUrl,   // 🔥 FIXED
      img: imgUrl,
    });

    const saved = await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: saved,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
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

    // ✅ OPTIONAL PDF UPDATE
    const pdfFile = req.files?.file?.[0];

    if (pdfFile) {
      updateData.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${pdfFile.filename}`;
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
    res.status(500).json({ success: false, message: err.message });
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
    res.status(500).json({ success: false, message: err.message });
  }
};