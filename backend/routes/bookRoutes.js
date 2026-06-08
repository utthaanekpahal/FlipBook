import express from "express";
import { getBooks, uploadBook } from "../controllers/bookController.js";
import { signup, login } from "../controllers/signupController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// =========================
// UPLOAD BOOK (FIXED)
// =========================
router.post(
  "/upload",
  upload.single("file"),
  uploadBook
);

// =========================
// GET BOOKS
// =========================
router.get("/", getBooks);

// =========================
// AUTH ROUTES
// =========================
router.post("/signup", signup);
router.post("/login", login);

export default router;