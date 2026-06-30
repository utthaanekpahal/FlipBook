import express from "express";
import {
  createTicket,
  getTickets,
  deleteTicket,
  hideTicket,
  replyTicket,
  markNotificationShown,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/create", createTicket);

router.get("/all", getTickets);


router.delete("/delete/:id", deleteTicket);

router.put("/hide/:id", hideTicket);

router.put("/reply/:id", replyTicket);
router.patch(
  "/notification/:id",
  markNotificationShown
);

export default router;
