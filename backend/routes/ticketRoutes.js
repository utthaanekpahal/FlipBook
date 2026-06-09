import express from "express";
import {
  createTicket,
  getTickets,
  deleteTicket,
  hideTicket,
  replyTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/create", createTicket);

router.get("/all", getTickets);


router.delete("/delete/:id", deleteTicket);

router.put("/hide/:id", hideTicket);

router.put("/reply/:id", replyTicket);


export default router;
