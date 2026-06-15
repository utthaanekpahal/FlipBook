import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {  name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword:{
     type:String,
     required:true
    },
    status: {
    type: String,
    enum: ["Active", "Deactivated"],
    default: "Active"
  },
  lastLogin: {
  type: Date,
  default: null
}
  },
  { timestamps: true }
);

export default mongoose.model("Agent", AgentSchema);