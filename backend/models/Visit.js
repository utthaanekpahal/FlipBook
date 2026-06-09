import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String  , required: true  },
    phone: { type: String, required: true },
    school: { type: String , required: true },
    followUp: { type: String ,required: true },

    photo: { type: String, required: true }, // image URL

    visitedBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", visitSchema);