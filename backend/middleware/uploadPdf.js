import multer from "multer";
import fs from "fs";

console.log("UPLOAD PDF MIDDLEWARE LOADED");

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

//Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    // remove spaces + unsafe chars
    const cleanName = file.originalname.replace(/\s+/g, "-");

    // unique filename
    const uniqueName = Date.now() + "-" + cleanName;

    cb(null, uniqueName);
  },
});

// 🔒 File filter (only PDF allowed)
const fileFilter = (req, file, cb) => {
  console.log("FILE TYPE:", file.mimetype);

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

//  Multer instance
const uploadPdf = multer({
  storage,
  fileFilter,
});

export default uploadPdf;