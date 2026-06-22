import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  subcategory: {
    type: String,
    required: true,
  },

  classes: [String],

  type: {
    type: String,
    default: "Semester",
  },
});

export default mongoose.model(
  "Category",
  categorySchema
);