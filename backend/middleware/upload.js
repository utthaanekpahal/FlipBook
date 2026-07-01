import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "flipbook/pdfs",
        resource_type: "raw",
        public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`,
      };
    }

    return {
      folder: "flipbook/images",
      resource_type: "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`,
    };
  },
});

const upload = multer({ storage });

export default upload;