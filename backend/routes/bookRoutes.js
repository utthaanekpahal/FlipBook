import express from "express";
import { uploadBook, getBooks } from "../controllers/bookController.js";

const router = express.Router();

// CREATE BOOK
router.post("/upload", uploadBook);

// GET BOOKS
router.get("/", getBooks);

export default router;