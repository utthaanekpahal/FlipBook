import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI missing in .env");
  }

  console.log("Connecting to MongoDB...");

  await mongoose.connect(uri);

  console.log("MongoDB connected successfully");

  return mongoose.connection;
};

export default connectDB;