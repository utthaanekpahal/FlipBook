import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FaLayerGroup , FaBook , FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import {
  FaBookOpen,
  FaCloudUploadAlt,
  FaSave,
} from "react-icons/fa";
import useApiLoader from "../../hook/useApiLoader";
const UploadBooks = () => {
  const navigate = useNavigate();
  const { loading, execute } = useApiLoader();
const [pdfFile, setPdfFile] = useState(null);

const [category, setCategory] = useState("");
const [book, setBook] = useState("");

const booksByCategory = {
  Navbodh: ["Buddy", "Little Lamp"],
  Gyanbodh: ["Deep Dives", "Hearing Bee"],
};

const [type, setType] = useState("");
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
      if (!category || !book || !className || !subject || !pdfFile || !type) {
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
      formData.append("filetype", "pdf");
      formData.append("book", book);
      formData.append("type", type);

  const res = await execute(() =>
      axios.post(
        "https://flipbook-production.up.railway.app/api/books/upload",
        formData
      )
    );

    
    console.log("UPLOAD SUCCESS:", res.data);
console.log("Uploaded Book:", res.data.data);
console.log("PDF URL:", res.data.data.fileUrl);

alert("Book Uploaded Successfully ✅");
navigate("/books");


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
  className="
    min-h-screen
    lg:ml-[35px]
    rounded-xl
    bg-cover
    bg-center
    flex
    justify-center
    px-4
    py-10
  "
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

        <div className="bg-white/20  backdrop-blur-md border-4 border-[#572C10] rounded-3xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <FaBookOpen className="text-6xl text-[#572C10] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-black">Upload Book</h1>
            <p className="text-black font-semibold mt-2">
              Upload PDF with proper category mapping
            </p>
          </div>

          {/* CATEGORY */}
 <div className="mb-4">
  <label className="block font-semibold text-[#572C10] mb-2">
    Category
  </label>

  <div className="relative">
    <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-[#572C10] text-lg" />

    <select
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        setBook(""); // category change hone par book reset
      }}
      className="
        w-full
        p-3
        pl-12
        rounded-xl
        border-2
        border-[#572C10]
        bg-white
        outline-none
      "
    >
      <option value="">Select Category</option>
      <option value="Navbodh">Navbodh</option>
      <option value="Gyanbodh">Gyanbodh</option>
    </select>
  </div>
</div>
<div className="mb-4">
  <label className="block font-semibold text-[#572C10] mb-2">
    Book Name
  </label>

  <div className="relative">
    <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-[#572C10] text-lg" />

    <select
      value={book}
      onChange={(e) => setBook(e.target.value)}
      disabled={!category}
      className="
        w-full
        p-3
        pl-12
        rounded-xl
        border-2
        border-[#572C10]
        bg-white
        outline-none
      "
    >
      <option value="">Select Book</option>

      {category &&
        booksByCategory[category]?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
    </select>
  </div>
</div>
<div className="mb-4">
  <label className="block font-semibold text-[#572C10] mb-2">
    Type
  </label>

  <div className="relative">

    <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-[#572C10] text-lg" />

    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="
        w-full
        p-3
        pl-12
        rounded-xl
        border-2
        border-[#572C10]
        bg-white
        outline-none
      "
    >
      <option value="">Select Type</option>
      <option value="Semester">Semester</option>
      <option value="Yearly">Yearly</option>
    </select>

  </div>
</div>

          {/* CLASS */}
       <div className="mb-4">
  <label className="block font-semibold text-[#572C10] mb-2">
    Class
  </label>

  <div className="relative">
    <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[#572C10] text-lg" />

    <select
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      className="
        w-full
        p-3
        pl-12
        rounded-xl
        border-2
        border-[#572C10]
        bg-white
        outline-none
      "
    >
      <option value="">Select Class</option>

      {[
        "Nursery",
        "LKG",
        "UKG",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
      ].map((cls) => (
        <option key={cls} value={cls}>
          {cls}
        </option>
      ))}
    </select>
  </div>
</div>
          {/* SUBJECT */}
       <div className="mb-4">
  <label className="block font-semibold text-[#572C10] mb-2">
    Subject
  </label>

  <div className="relative">

    <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-[#572C10] text-lg" />

    <select
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="
        w-full
        p-3
        pl-12
        rounded-xl
        border-2
        border-[#572C10]
        bg-white
        outline-none
      "
    >
      <option value="">Select Subject</option>
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="Maths">Maths</option>
      <option value="Rhymes">Rhymes</option>
      <option value="Drawing">Drawing</option>
      <option value="Science">Science</option>
      <option value="Social Studies">Social Studies</option>
      <option value="Sanskrit">Sanskrit</option>
      <option value="EVS">EVS</option>
      
      <option value="Computer Science">Computer </option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
           <option value="Biology">Biology</option>
    </select>

  </div>
</div>

          {/* DROPZONE */}
          <div
  {...getRootProps()}
  className="
    border-2
    border-dashed
    border-[#572C10]

    rounded-2xl
    p-8

    text-center

    bg-white
  "
>
  <input {...getInputProps()} />

  <FaCloudUploadAlt className="text-5xl text-[#572C10] mx-auto mb-4" />

  {!pdfFile ? (
    <>
      <h2 className="font-bold text-2xl text-[#572C10]">
        Drag & Drop PDF Here
      </h2>

      <p className="text-gray-700 mt-2">
        Only PDF files allowed
      </p>

      <button
        type="button"
        onClick={open}
        className="
          mt-4
          bg-[#572C10]
          text-white

          px-6
          py-3

          rounded-xl

          font-bold
        "
      >
        Select PDF
      </button>
    </>
  ) : (
    <>
      <h2 className="font-bold text-2xl text-[#572C10]">
        PDF Selected ✅
      </h2>

      <p className="mt-4 text-lg font-semibold text-[#572C10] break-words">
        📄 {pdfFile.name}
      </p>

      <button
        type="button"
        onClick={open}
        className="
          mt-5

          border-2
          border-[#572C10]

          text-[#572C10]

          px-6
          py-2

          rounded-xl

          font-bold
        "
      >
        Change PDF
      </button>
    </>
  )}
</div>
          {/* SAVE */}
     <button
  onClick={saveBook}
  disabled={loading}
  className={`
    w-full mt-6 py-4 rounded-xl font-bold
    flex items-center justify-center gap-3
    transition-all duration-300
    ${
      loading
        ? "bg-gradient-to-r from-[#8B5A2B] to-[#572C10] cursor-not-allowed"
        : "bg-[#572C10] hover:bg-[#6b3414] text-white hover:scale-[1.02]"
    }
  `}
>
  {loading ? (
    <>
      <div className="relative">
        <FaCloudUploadAlt className="text-2xl animate-bounce text-white" />

        <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></span>
      </div>

      <div className="flex flex-col items-start leading-tight">
        <span className="text-white font-bold">
          Uploading Book...
        </span>
        <span className="text-xs text-white/80">
          Please wait, don't close this page
        </span>
      </div>
    </>
  ) : (
    <>
      <FaSave className="text-lg" />
      Save Books
    </>
  )}
</button>

        </div>
      </div>
    </div>
  );
};

export default UploadBooks;