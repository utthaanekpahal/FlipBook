import express from "express";
<<<<<<< HEAD
import {
  getBooks,
  uploadBook,
  getCategories
} from "../controllers/bookController.js";

import { signup, login } from "../controllers/signupController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// =========================
// UPLOAD BOOK
// =========================
router.post("/upload", upload.single("file"), uploadBook);

// =========================
// GET BOOKS
// =========================
router.get("/", getBooks);

// =========================
// CATEGORY GROUPED API
// =========================
router.get("/categories", getCategories);

// =========================
// AUTH ROUTES
// =========================
=======
import { uploadBook, getBooks } from "../controllers/bookController.js";
import {
  signup,
  login,
  agentsignup,
  getAgents,
} from "../controllers/SignupController.js";

const router = express.Router();

router.post("/upload", uploadBook);
router.get("/", getBooks);

>>>>>>> 0db9104 (Resolve merge conflict and update project)
router.post("/signup", signup);
router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);

export default router;