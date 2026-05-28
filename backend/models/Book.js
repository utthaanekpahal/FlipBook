import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },

    img: { type: String },

    category: { type: String, required: true }, // 👈 Navbodh / Gyanbodh yaha hoga

    subject: { type: String },
    className: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);