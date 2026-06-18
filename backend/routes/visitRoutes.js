import express from "express";
import uploadImage from "../middleware/uploadImage.js";

import {
  createVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
} from "../controllers/visitController.js";

const router = express.Router();

// CREATE
router.post(
  "/create",
  uploadImage.single("photo"),
  createVisit
);

// GET ALL
router.get("/", getVisits);

// GET SINGLE
router.get("/:id", getVisitById);

// UPDATE
router.put("/:id", updateVisit);

// DELETE
router.delete("/:id", deleteVisit);

export default router;