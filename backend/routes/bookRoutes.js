import express from "express";
import {
  getBooks,
  uploadBooks,
  getCategories,
  updateBooks,
  deleteBooks
} from "../controllers/bookController.js";

import {
  signup,
  login,
  agentsignup,
  getAgents,
  agentupdate
} from "../controllers/signupController.js";

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
  uploadBooks   // ✅ FIXED HERE
);

// =========================
// GET BOOKS
// =========================
router.get("/", getBooks);

// =========================
// UPDATE BOOK
// =========================
router.put("/:id", updateBooks);

// =========================
// DELETE BOOK
// =========================
router.delete("/:id", deleteBooks);

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