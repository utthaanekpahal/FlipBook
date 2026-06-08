import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
connectDB();


// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/tickets", ticketRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});