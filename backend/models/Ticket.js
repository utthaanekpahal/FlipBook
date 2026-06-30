import mongoose from "mongoose";

// =========================
// Reply Schema
// =========================
const replySchema = new mongoose.Schema({
  message: { type: String, required: true },

  status: {
    type: String,
    enum: ["progress", "resolved", "wait"],
    default: "wait",
  },

  repliedBy: {
    type: String,
    enum: ["user", "agent"],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
// =========================
// Ticket Schema
// =========================
const ticketSchema = new mongoose.Schema(
  {
    Agentname: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["technical", "billing", "support"],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // ⭐ FIXED: now no error if frontend forgets role
    role: {
      type: String,
      enum: ["user", "agent"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["progress", "resolved", "wait"],
      default: "wait",
    },
    notificationShown: {
  type: Boolean,
  default: false,
},
    replies: [replySchema],
    hiddenForRoles: [
    {
    role: String,
    },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);