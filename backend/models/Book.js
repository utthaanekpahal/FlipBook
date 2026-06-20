import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
  fileUrl: String,
  category: String,
  className: String,
  subject: String,
  type: String,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;