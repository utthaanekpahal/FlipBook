import express from "express";
import {
  getBooks,
  uploadBooks,
  updateBooks,
  deleteBooks,
} from "../controllers/bookController.js";

import {
  login,
  agentsignup,
  getAgents,
  agentupdate,
  deleteAgent,
} from "../controllers/SignupController.js";

import uploadPdf from "../middleware/uploadPdf.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();


// =========================
// UPLOAD BOOK (IMAGE + PDF BOTH SUPPORT)
// =========================
router.post(
  "/upload",
  uploadPdf.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 }
  ]),
  uploadBooks
);


// =========================
// GET BOOKS
// =========================
router.get("/", getBooks);


// =========================
// UPDATE BOOK (IMAGE ONLY)
// =========================
router.put(
  "/:id",
  uploadImage.single("img"),
  updateBooks
);


// =========================
// DELETE BOOK
// =========================
router.delete("/:id", deleteBooks);


// =========================
// AUTH ROUTES
// =========================
router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);
router.put("/agents/:id", agentupdate);
router.delete("/agents/:id", deleteAgent);

export default router;