import mongoose from "mongoose";
import dotenv from "dotenv";

import Book from "../models/Book.js";
import booksData from "../data/booksData.js";

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // delete old books
    await Book.deleteMany();

    // insert new books
    await Book.insertMany(booksData);

    console.log("Books inserted successfully");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedBooks();