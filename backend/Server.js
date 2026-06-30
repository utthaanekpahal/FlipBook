import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

const app = express();

// =========================
// CORS
// =========================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://flip-book-gxli.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked CORS origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

// Preflight requests
app.options("*", cors(corsOptions));
// Handle preflight requests
// =========================
// BODY PARSER
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// STATIC FILES (UPLOADS)
// =========================

// 👇 THIS IS REQUIRED
app.use("/uploads", express.static("uploads"));
app.set("trust proxy", 1);
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
app.use("/api/categories", categoryRoutes);

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


