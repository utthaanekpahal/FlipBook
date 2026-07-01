import multer from "multer";

console.log("UPLOAD PDF MIDDLEWARE LOADED");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log("FILE TYPE:", file.mimetype);

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const uploadPdf = multer({
  storage,
  fileFilter,
});

export default uploadPdf;