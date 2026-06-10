import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBookOpen,
  FaCloudUploadAlt,
  FaSave,
} from "react-icons/fa";

const UploadBooks = () => {
  const navigate = useNavigate();

  const [pdfFile, setPdfFile] = useState(null);

  const [category, setCategory] = useState("");
  const [book, setBook] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");

  // =========================
  // DROP HANDLER
  // =========================
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setPdfFile(file);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
    noClick: true,
  });

  // =========================
  // SAVE + UPLOAD
  // =========================
  const saveBook = async () => {
    try {
      if (!category || !book || !className || !subject || !pdfFile) {
        alert("Please fill all fields and upload PDF");
        return;
      }

      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("title", book);
      formData.append("author", "Admin");
      formData.append("description", "Book uploaded via system");
      formData.append("category", category);
      formData.append("className", className);
      formData.append("subject", subject);
      formData.append("type", "pdf");
      formData.append("book", book);

     const res = await axios.post(
  "http://localhost:3000/api/books/upload",
  formData
);

    

      // =========================
      // NAVIGATE TO FLIPBOOK
      // =========================
    console.log("UPLOAD SUCCESS:", res.data);
console.log("Uploaded Book:", res.data.data);
console.log("PDF URL:", res.data.data.fileUrl);

alert("Book Uploaded Successfully ✅");

navigate(
  `/flipbook?pdf=${encodeURIComponent(
    res.data.data.fileUrl
  )}&title=${encodeURIComponent(book)}`
);

      // RESET
      setCategory("");
      setBook("");
      setClassName("");
      setSubject("");
      setPdfFile(null);

    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error.message);
      alert("Upload Failed ❌");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/background img.png')" }}
    >
      <div className="w-full max-w-2xl">

        {/* BACK */}
        <button
          onClick={() => navigate("/Dashboard")}
          className="mb-4 bg-[#572C10] text-white px-5 py-2 rounded-xl font-bold"
        >
          ← Back
        </button>

        <div className="bg-white/20 backdrop-blur-md border-4 border-[#572C10] rounded-3xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <FaBookOpen className="text-6xl text-[#572C10] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-black">Upload Book</h1>
            <p className="text-black font-semibold mt-2">
              Upload PDF with proper category mapping
            </p>
          </div>

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setBook("");
            }}
            className="w-full p-3 rounded-xl border mb-4"
          >
            <option value="">Select Category</option>
            <option value="Navbodh">Navbodh</option>
            <option value="Gyanbodh">Gyanbodh</option>
          </select>

          {/* BOOK */}
          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="w-full p-3 rounded-xl border mb-4"
          >
            <option value="">Select Book</option>

            {category === "Navbodh" && (
              <>
                <option value="Book N1">Book N1</option>
                <option value="Book N2">Book N2</option>
              </>
            )}

            {category === "Gyanbodh" && (
              <>
                <option value="Book G1">Book G1</option>
                <option value="Book G2">Book G2</option>
              </>
            )}
          </select>

          {/* CLASS */}
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-3 rounded-xl border mb-4"
          >
            <option value="">Select Class</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={`Class ${num}`}>
                Class {num}
              </option>
            ))}
          </select>

          {/* SUBJECT */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-xl border mb-6"
          >
            <option value="">Select Subject</option>
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="EVS">EVS</option>
            <option value="Science">Science</option>
            <option value="Social Science">Social Science</option>
          </select>

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-[#572C10] rounded-2xl p-8 text-center"
          >
            <input {...getInputProps()} />

            <FaCloudUploadAlt className="text-5xl text-blue-500 mx-auto mb-4" />

            <h2 className="font-bold text-2xl text-[#572C10]">
              Drag & Drop PDF Here
            </h2>

            <p className="text-gray-700 mt-2">Only PDF files allowed</p>

            <button
              type="button"
              onClick={open}
              className="mt-4 bg-[#572C10] text-white px-6 py-3 rounded-xl font-bold"
            >
              Select PDF
            </button>
          </div>

          {/* FILE NAME */}
          {pdfFile && (
            <div className="mt-6 bg-green-100 border border-green-500 rounded-xl p-4">
              📄 {pdfFile.name}
            </div>
          )}

          {/* SAVE */}
          <button
            onClick={saveBook}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <FaSave />
            Save & Open FlipBook
          </button>

        </div>
      </div>
    </div>
  );
};

export default UploadBooks;