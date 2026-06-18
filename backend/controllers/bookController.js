import Book from "../models/Book.js";

// =========================
// Upload Book
// =========================
const uploadBooks = async (req, res) => {
  try {

    console.log("FILE:", req.file);

    const {
      title,
      author,
      description,
      category,
      book,
      className,
      subject,
      type,
    } = req.body;

    let imgUrl = "";

    if (req.file) {
      imgUrl =
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      category,
      book,
      className,
      subject,
type,
      img: imgUrl,

      fileUrl: imgUrl,
    });

    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: newBook,
    });

  } catch (error) {

    console.log(error);

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

  }

  catch (error) {

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

      const category =
        item.category || "Unknown";

      const book =
        item.book || "Unknown";

      const className =
        item.className || "Unknown";

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

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =========================
// Update Book
// =========================

const updateBooks = async (req, res) => {

  try {

    const { id } = req.params;

    const updateData = {

      title: req.body.title,

      author: req.body.author,

      description: req.body.description,

      category: req.body.category,

      book: req.body.book,

      className: req.body.className,

      subject: req.body.subject,

      type: req.body.type,

    };

    // New image selected ho to update karo

    if (req.file) {

      updateData.img =
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    }

    const updatedBook =
      await Book.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedBook) {

      return res.status(404).json({

        success: false,

        message: "Book not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Book updated successfully",

      data: updatedBook,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =========================
// Delete Book
// =========================

const deleteBooks = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedBook =
      await Book.findByIdAndDelete(id);

    if (!deletedBook) {

      return res.status(404).json({

        success: false,

        message: "Book not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Book deleted successfully",

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export {

  uploadBooks,

  getBooks,

  getCategories,

  updateBooks,

  deleteBooks,

};