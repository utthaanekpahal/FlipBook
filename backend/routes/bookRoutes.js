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

router.get("/books", getBooks);

router.post(
  "/books/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  uploadBooks
);

router.put(
  "/books/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  updateBooks
);

router.delete("/books/:id", deleteBooks);

/* ================= AUTH ROUTES ================= */

router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);
router.put("/agents/:id", agentupdate);
router.delete("/agents/:id", deleteAgent);

export default router;