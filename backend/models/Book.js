import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    img: { type: String },

    category: { type: String, required: true },

    book: { type: String }, // 

    subject: { type: String },
    className: { type: String },

    fileUrl: { type: String, required: true },

    type: {
      type: String,
      enum: ["pdf", "Semester", "Yearly"],
      default: "pdf",
    },

    uploadedBy: {
      type: String,
      default: "agent",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);