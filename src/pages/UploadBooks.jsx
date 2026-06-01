import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaCloudUploadAlt } from "react-icons/fa";

const UploadBooks = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setPdfFile(file);
  };

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    multiple: false,
    noClick: true,
  });

  const openFlipBook = () => {
    if (!pdfFile) return;

    const pdfUrl = URL.createObjectURL(pdfFile);

    navigate("/flipPage", {
      state: {
        title: pdfFile.name,
        pdf: pdfUrl,
      },
    });
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4"
  style={{
    backgroundImage: "url('background img.png')",
  }}
>
  {/* Back Button */}
  <div className="w-full max-w-md mb-4">
    <button className="text-white font-bold bg-[#572C10] px-4 py-2 rounded-lg backdrop-blur-md border  transition"
    onClick={()=>{navigate("/Dashboard")}}>
      ← Back
    </button>
  </div>

  {/* Upload Card */}
  <div className="relative z-10 w-full max-w-md bg-white/15 backdrop-blur-md border-4 border-[#572C10] rounded-3xl p-8 shadow-2xl">
    
    {/* Header */}
    <div className="text-center mb-6">
      <FaBookOpen className="text-6xl text-[#572C10] mx-auto mb-3" />

      <h1 className="text-3xl font-bold text-black">Upload Book</h1>

      <p className="text-black text-2xl font-bold mt-2">
        Upload your PDF and read it as a FlipBook
      </p>
    </div>

    {/* Dropzone */}
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-[#572C10] rounded-2xl p-8 text-center hover:bg-white/10 transition duration-300"
    >
      <input {...getInputProps()} />

      <FaCloudUploadAlt className="text-5xl text-blue-400 mx-auto mb-4" />

      <p className="text-black font-semibold text-lg">
        Drag & Drop PDF Here
      </p>

      <p className="text-black text-2xl font-bold mt-2">
        Only PDF files allowed
      </p>

      <button
        type="button"
        onClick={open}
        className="mt-5 bg-[#572C10] text-white px-6 py-3 rounded-xl font-bold shadow-lg transition duration-300"
      >
        Select PDF
      </button>
    </div>

    {pdfFile && (
      <div className="mt-5 bg-green-500/20 border border-green-400 rounded-xl p-4">
        <p className="text-black font-semibold break-words">
          📄 {pdfFile.name}
        </p>

        <button
          onClick={openFlipBook}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition duration-300"
        >
          📖 Open FlipBook
        </button>
      </div>
    )}
  </div>
</div>
    
  );
};

export default UploadBooks;