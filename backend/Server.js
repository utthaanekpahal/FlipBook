import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";

dotenv.config();

const app = express();

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// =========================
// BODY PARSER
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// STATIC FILES (UPLOADS)
// =========================
app.use("/uploads", express.static("uploads"));

// =========================
// DATABASE CONNECT
// =========================
connectDB();

// =========================
// ROUTES
// =========================
app.use("/api/books", bookRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/visits", visitRoutes);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});