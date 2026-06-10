import express from "express";
import uploadImage from "../middleware/uploadImage.js";
import { createVisit, getVisits } from "../controllers/visitController.js";

const router = express.Router();

router.post(
  "/create",
  uploadImage.single("photo"),
  createVisit
);

router.get("/", getVisits);

export default router;