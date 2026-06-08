import express from "express";
import {
  createTicket,
  getTickets,
  deleteTicket,
  hideTicket,
  replyTicket,
} from "../controllers/ticketController.js";

const router = express.Router();


// =========================
// CREATE TICKET
// =========================
router.post("/create", createTicket);


// =========================
// GET ALL TICKETS
// =========================
router.get("/all", getTickets);


// =========================
// DELETE TICKET
// =========================
router.delete("/delete/:id", deleteTicket);


// =========================
// HIDE TICKET (role-based UI hide)
// =========================
router.put("/hide/:id", hideTicket);


// =========================
// REPLY TO TICKET
// =========================
router.put("/reply/:id", replyTicket);


export default router;
