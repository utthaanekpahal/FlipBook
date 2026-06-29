import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// =====================
// PDF COVER GENERATOR
// =====================
const getPdfCover = async (pdfUrl) => {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.7 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    return canvas.toDataURL("image/jpeg");
  } catch (err) {
    console.log(err);
    return "/default.jpg";
  }
};

const ClassPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { className, category } = location.state || {};

  const [mongoBooks, setMongoBooks] = useState([]);
  const [covers, setCovers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const res = await axios.get("https://flipbook-production.up.railway.app/api/books");

        const filtered = res.data.data.filter(
          (item) =>
            item.category === category &&
            item.className === className
        );

        setMongoBooks(filtered);

        // generate covers
        const coverMap = {};
        for (let book of filtered) {
          if (book.fileUrl) {
            coverMap[book._id] = await getPdfCover(book.fileUrl);
          }
        }

        setCovers(coverMap);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (category && className) fetchBooks();
  }, [category, className]);

  return (
 <div className="min-h-screen lg:ml-[35px] rounded-xl bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7] px-4 py-10">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#3b2414]">
          📚 {className}
        </h1>
        <p className="text-[#7a4a2a] font-semibold mt-2">
          {category}
        </p>
      </div>

      {/* LOADER */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-[#7a4a2a] font-semibold">
            Loading Books...
          </div>
        </div>
      ) : (
        <>
          {/* GRID CENTER WRAPPER */}
          <div className="flex justify-center">
            <div className="w-full max-w-7xl">

              {/* BOOK GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                {mongoBooks.map((item) => (
                  <div
                    key={item._id}
                    onClick={() =>
                      navigate("/flipPage", {
                        state: {
                          title: item.title,
                          pdf: item.fileUrl,
                        },
                      })
                    }
                    className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      shadow-lg
                      hover:shadow-2xl
                      cursor-pointer
                      transition-all duration-300
                      hover:-translate-y-2
                    "
                  >

                    {/* COVER IMAGE BIGGER */}
                    <div className="relative w-full h-[400px] overflow-hidden">
                      <img
                        src={covers[item._id] || "/default.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                      />
                    </div>

                   {/* CONTENT */}
<div className="p-5 space-y-4">

  {/* TOP 3 BOX ROW */}
  <div className="grid grid-cols-2 gap-2">

   

    {/* SUBJECT BOX */}
    <div className="bg-[#eaf4ff] border border-[#cfe3ff] rounded-xl px-2 py-2 text-center">
     
      <p className="text-xl font-bold text-blue-700 truncate">
        {item.subject}
      </p>
    </div>

    {/* TYPE BOX */}
    <div
      className={`rounded-xl px-2 py-2 text-center border ${
        item.type === "Semester"
          ? "bg-blue-100 border-blue-200 text-blue-700"
          : item.type === "Yearly"
          ? "bg-purple-100 border-purple-200 text-purple-700"
          : "bg-green-100 border-green-200 text-green-700"
      }`}
    >
     
      <p className="text-xl font-bold truncate">{item.type}</p>
    </div>

  </div>

  {/* DESCRIPTION */}
  <div className="bg-gradient-to-r from-[#fff7f0] to-[#fff1e6] border border-[#f3d5c0] rounded-xl p-3">
    <p className="text-2xl font-bold text-pink-700 leading-relaxed line-clamp-3">
      {item.description || "No description available"}
    </p>
  </div>

</div>
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* NO DATA */}
          {mongoBooks.length === 0 && (
            <p className="text-center text-red-500 mt-10 font-semibold">
              No Books Found
            </p>
          )}
        </>
      )}

      {/* BACK BUTTON */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#99582A] hover:bg-[#7a421f] text-white px-10 py-3 rounded-2xl font-semibold shadow-lg transition"
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default ClassPage;