import express from "express";
import {
  getBooks,
  uploadBooks,
  getCategories,
  updateBooks,
  deleteBooks
} from "../controllers/bookController.js";

import uploadPdf from "../middleware/uploadPdf.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

// Upload Book (PDF)
router.post(
  "/upload",
  uploadPdf.single("file"),
  uploadBooks
);

// Get Books
router.get("/", getBooks);

// Update Book + Image
router.put(
  "/:id",
  uploadImage.single("img"),
  updateBooks
);

// Delete Book
router.delete("/:id", deleteBooks);

// Categories
router.get("/categories", getCategories);

export default router;