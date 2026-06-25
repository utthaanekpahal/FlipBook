import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    img: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,   // 🔥 IMPORTANT (Drawing → drawing)
    },

    type: {
      type: String,
      required: true,
      enum: ["Semester", "Yearly"], // controlled field only
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;