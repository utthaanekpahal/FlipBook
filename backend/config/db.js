import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns"
dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI missing in .env");
    }

    console.log("Connecting to MongoDB...");
    console.log("URI Found:", !!uri);

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("=================================");
    console.error("MongoDB connection error:");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("=================================");
  }
};

export default connectDB;