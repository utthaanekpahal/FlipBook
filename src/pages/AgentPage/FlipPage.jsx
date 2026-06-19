import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { pdf, title } = location.state || {};

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const bookRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/page-flip.mp3");
    if (pdf) loadPDF();
  }, [pdf]);

  const loadPDF = async () => {
    try {
      setLoading(true);

      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      const tempPages = [];
      const maxPages = Math.min(pdfDoc.numPages, 30);

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.4 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        tempPages.push(canvas.toDataURL("image/webp", 0.9));
      }

      setPages(tempPages);
      setCurrentPage(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= BOOK =================
  const bookPages = ["COVER", ...pages, "BACK"];
  
  const pdfPagesCount = pages.length;

  // 👉 FIXED PAGE NUMBER (1,2,3...)
  const displayPage =
    currentPage === 0
      ? 0
      : currentPage > pdfPagesCount
      ? pdfPagesCount
      : currentPage;

  // 👉 FIXED PROGRESS (ONLY PDF PAGES)
  const progress =
    pdfPagesCount > 0
      ? Math.round(((displayPage) / pdfPagesCount) * 100)
      : 0;

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">

      {/* ================= TOP BAR ================= */}
      <div className="flex justify-center py-3 bg-white shadow relative">

        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 bg-[#572C10] text-white px-4 py-2 rounded"
        >
          ← Back
        </button>

        <h1 className="font-bold text-[#572C10]">
          {title || "Flip Book"}
        </h1>
      </div>

      {/* ================= PROGRESS ================= */}
      {pages.length > 0 && (
        <div className="px-5 py-2">
          
          <div className="flex justify-between text-xs mb-1">
            <span>Page {displayPage} / {pdfPagesCount}</span>
            <span>{progress}%</span>
          </div>

          <div className="h-3 bg-blue-800 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ================= BOOK ================= */}
      <div className="flex-1 flex items-center justify-center">

        {pages.length > 0 && (
          <HTMLFlipBook
            ref={bookRef}
            width={380}
            height={480}
            size="fixed"
            showCover={true}
            drawShadow={true}
            useMouseEvents={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.5}
            startPage={0}
            onFlip={(e) => setCurrentPage(e.data)}
            onChangeState={(e) => {
              if (e.data === "flipping") playSound();
            }}
          >

            {/* COVER */}
            <div className="flex items-center justify-center bg-yellow-100 border-4 border-[#572C10]">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>

            {/* PDF PAGES */}
            {pages.map((p, i) => (
              <div key={i} className="flex items-center justify-center bg-white">
                <img src={p} className="w-full h-full object-contain" />
              </div>
            ))}

            {/* BACK */}
            <div className="flex items-center justify-center bg-gray-300 border-4 border-[#572C10]">
              <h2 className="text-xl font-bold">The End</h2>
            </div>

          </HTMLFlipBook>
        )}

      </div>

      {/* ================= BOTTOM CONTROLS LEFT ================= */}
      {pages.length > 0 && (
        <div className="flex items-center justify-center gap-4 px-4 py-3 bg-white shadow">

          <button
            onClick={() => bookRef.current.pageFlip().flipPrev()}
            className="bg-[#572C10] text-white px-5 py-2 rounded"
          >
            ⬅ Prev
          </button>

          <button
            onClick={() => bookRef.current.pageFlip().flipNext()}
            className="bg-[#572C10] text-white px-5 py-2 rounded"
          >
            Next ➡
          </button>

           <button
  onClick={() => navigate(-1)}
  className="bg-[#572C10] text-white px-5 py-2 rounded justify-self-end"
>
  Back
</button>

        </div>
      )}

    </div>
  );
}

export default FlipPage;