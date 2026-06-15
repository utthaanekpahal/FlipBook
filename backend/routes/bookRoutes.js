import express from "express";
import {
  getBooks,
  uploadBook,
  getCategories
} from "../controllers/bookController.js";

import { signup, login , agentsignup, getAgents , agentupdate} from "../controllers/signupController.js";
import uploadPdf from "../middleware/uploadPdf.js";

const router = express.Router();

// =========================
// UPLOAD BOOK
// =========================
router.post(
  "/upload",
  (req, res, next) => {
    console.log("BOOK UPLOAD ROUTE HIT");
    next();
  },
  uploadPdf.single("file"),
  uploadBook
);

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
router.post("/signup", signup);
router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);
router.put("/agents/:id", agentupdate);

export default router;