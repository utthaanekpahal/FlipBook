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


app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "https://flip-book-dzbj.vercel.app"
    ],
    credentials:true
  })
);


app.use(express.json({
  limit:"500mb"
}));

app.use(express.urlencoded({
  extended:true,
  limit:"500mb"
}));


app.use("/uploads",express.static("uploads"));


connectDB();


app.use("/api/books",bookRoutes);
app.use("/api/tickets",ticketRoutes);
app.use("/api/visits",visitRoutes);
app.use("/api/categories",categoryRoutes);



app.get("/",(req,res)=>{
 res.send("Server running");
});


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`);
});