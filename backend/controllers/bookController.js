import Book from "../models/Book.js";

// upload book
const uploadBook = async (req, res) => {
  try {

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

    const newBook = await Book.create({
      title,
      author,
      description,
      img,
      category,
      className,
      type,
      subject,
    });

    res.status(201).json({
      success: true,
      data: newBook,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// get books
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