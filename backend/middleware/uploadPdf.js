import multer from "multer";
import fs from "fs";
import path from "path";

console.log("UPLOAD PDF MIDDLEWARE LOADED");

// 📁 ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 📦 storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-");
    const uniqueName = Date.now() + "-" + cleanName;
    cb(null, uniqueName);
  },
});

// 🔥 flexible PDF filter (IMPORTANT FIX)
const fileFilter = (req, file, cb) => {
  console.log("FILE TYPE:", file.mimetype);

  const allowedMimeTypes = [
    "application/pdf",
    "application/octet-stream", // some browsers send this
  ];

  const isPdf =
    allowedMimeTypes.includes(file.mimetype) ||
    file.originalname.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// 🚀 multer instance
const uploadPdf = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit (optional safety)
  },
});

export default uploadPdf;