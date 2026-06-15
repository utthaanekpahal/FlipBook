import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    // School details
    schoolName: {
      type: String,
      required: true,
    },

    teacher: {
      type: String,
      required: true,
    },

    principal: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Visit details
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    outcome: {
      type: String,
      enum: [
        "Pending",
        "Interested",
        "Follow Up",
        "Ordered",
        "Not Interested",
      ],
      default: "Pending",
    },

    notes: {
      type: String,
    },

    // Selfie / proof image
    photo: {
      type: String, // Cloudinary or AWS S3 image URL
      required: true,
    },

    visitedBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", visitSchema);