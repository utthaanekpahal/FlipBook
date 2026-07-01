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

import upload from "../middleware/upload.js";

const router = express.Router();

/* ================= BOOK ROUTES ================= */

// GET ALL BOOKS
router.get("/", getBooks);

// UPLOAD BOOK
router.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  uploadBooks
);

// UPDATE BOOK
router.put(
  "/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  updateBooks
);

// DELETE BOOK
router.delete("/:id", deleteBooks);

/* ================= AUTH ROUTES ================= */

router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);
router.put("/agents/:id", agentupdate);
router.delete("/agents/:id", deleteAgent);

export default router;