import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    author: { type: String, required: true },

    description: { type: String },

    img: { type: String },

    category: { type: String, required: true },

    subject: { type: String },

    className: { type: String },

    // ⭐ ADD THIS (VERY IMPORTANT)
    fileUrl: { type: String, required: true },

    // optional (future use)
    type: {
      type: String,
      enum: ["pdf"],
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