import mongoose from "mongoose";
import dotenv from "dotenv";

import Book from "../models/Book.js";
import booksData from "../data/booksData.js";

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected ");

    const result = await Book.insertMany(booksData);

    console.log("Books inserted successfully ");
    console.log("Total inserted:", result.length);

    process.exit();
  } catch (error) {
    console.log("❌ SEED ERROR:");
    console.log(error.message);
    process.exit(1);
  }
};

seedBooks();