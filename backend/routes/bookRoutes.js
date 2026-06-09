import express from "express";
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

router.post("/signup", signup);
router.post("/agentsignup", agentsignup);
router.post("/login", login);
router.get("/agents", getAgents);

export default router;