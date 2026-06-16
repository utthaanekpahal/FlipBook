import mongoose from "mongoose";
import dotenv from "dotenv";

import Book from "../models/Book.js";
import booksData from "../data/booksData.js";

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // optional but recommended
    await Book.deleteMany();

    const result = await Book.insertMany(booksData);

    console.log("Books inserted successfully");
    console.log("Total inserted:", result.length);

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.log("❌ SEED ERROR:", error.message);
    process.exit(1);
  }
};

seedBooks();