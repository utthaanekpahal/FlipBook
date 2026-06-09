import Ticket from "../models/Ticket.js";


// =========================
// CREATE TICKET (ticketHandler logic)
// =========================
export const createTicket = async (req, res) => {
  try {
    const { Agentname, category, subject, message } = req.body;

    const newTicket = new Ticket({
      Agentname,
      category,
      subject,
      message,
      date: new Date().toLocaleDateString(),
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// =========================
// GET ALL TICKETS (adminUpdates logic)
// =========================
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// =========================
// DELETE TICKET (deleteUpdate logic)
// =========================
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// =========================
// HIDE TICKET (hiddenTickets logic)
// =========================
export const hideTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // same frontend logic: add role-based hidden
    ticket.hiddenForRoles.push({ role });

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket hidden for role",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// =========================
// REPLY TICKET (submitReply logic)
// =========================
export const replyTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      message,
      repliedBy,
    } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }
    ticket.replies = [];
    ticket.replies.push({
      message,
      status,
      repliedBy,
    });

    await ticket.save();

    res.status(200).json({
      success: true,
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};