import express from "express";
import { uploadBook, getBooks } from "../controllers/bookController.js";
import { signup, login } from "../controllers/signupController.js";

const router = express.Router();

// BOOK ROUTES
router.post("/upload", uploadBook);
router.get("/", getBooks);

// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);

export default router;