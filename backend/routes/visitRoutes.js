import express from "express";
import upload from "../middleware/upload.js";
import { createVisit, getVisits } from "../controllers/visitController.js";

const router = express.Router();

router.post("/create", upload.single("photo"), createVisit);
router.get("/", getVisits);

export default router;