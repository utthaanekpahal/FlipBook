import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
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
    },

    className: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);