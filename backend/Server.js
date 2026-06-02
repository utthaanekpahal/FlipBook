import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

// Connect MongoDB
connectDB();


// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});