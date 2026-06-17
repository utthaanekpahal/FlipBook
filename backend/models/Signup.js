import mongoose from "mongoose";

const SignSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "agent"],
      default: "agent",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", SignSchema);