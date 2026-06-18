import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// PDF worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { pdf, title } = location.state || {};

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const bookRef = useRef();
  const audioRef = useRef(null);

  // ================= LOAD PDF =================
  useEffect(() => {
    audioRef.current = new Audio("/oxidvideos-page-flip-1-178322.mp3");

    if (pdf) loadPDF();
  }, [pdf]);

  // ================= CONVERT PDF =================
  const loadPDF = async () => {
    try {
      setLoading(true);

      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      const loadedPages = [];
      const maxPages = Math.min(pdfDoc.numPages, 20);

      for (let i = 1; i <= maxPages; i++) {
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({ scale: 1.3 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        loadedPages.push(canvas.toDataURL("image/webp", 0.8));

        await new Promise((r) => setTimeout(r, 30));
      }

      setPages(loadedPages);
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= SOUND =================
  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  // ================= PROGRESS FIX =================
  const progress =
    pages.length > 0
      ? Math.min((currentPage / pages.length) * 100, 100)
      : 0;

  // ================= LAST PAGE FIX =================
  useEffect(() => {
    if (currentPage > pages.length && pages.length > 0) {
      setCurrentPage(pages.length);
    }
  }, [currentPage, pages.length]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="animate-spin h-12 w-12 border-4 border-[#572C10] border-t-transparent rounded-full"></div>
        <p className="mt-4 font-bold text-[#572C10]">
          Loading Flipbook...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-300 px-4 py-6">

      {/* BACK */}
      <div className="w-full max-w-4xl mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#572C10] text-white px-5 py-2 rounded-xl font-bold"
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mt-4 text-[#572C10] text-center">
        {title || "Flip Book"}
      </h1>

      {/* PROGRESS BAR */}
      {pages.length > 0 && (
        <div className="w-full max-w-md mt-4 mb-5">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>
              Page {currentPage} / {pages.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-3 bg-white rounded-full overflow-hidden shadow">
            <div
              className="h-full bg-gradient-to-r from-purple-700 via-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* FLIPBOOK */}
      {pages.length > 0 && (
        <>
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={500}
            size="stretch"
            minWidth={300}
            maxWidth={400}
            minHeight={400}
            maxHeight={500}
            showCover={false}
            mobileScrollSupport={true}
            useMouseEvents={true}
            drawShadow={true}
            autoSize={true}
            onFlip={(e) => {
              setCurrentPage(e.data + 1);
            }}
            onChangeState={(e) => {
              if (e.data === "flipping") playSound();
            }}
          >
            {pages.map((page, index) => (
              <div
                key={index}
                className="bg-white flex items-center justify-center"
              >
                <img
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </HTMLFlipBook>

          {/* CONTROLS */}
          <div className="flex items-center gap-6 mt-6 flex-wrap justify-center">

            <button
              onClick={() => bookRef.current.pageFlip().flipPrev()}
              className="bg-[#572C10] text-white px-6 py-2 rounded-xl font-bold"
            >
              ← Previous
            </button>

            <div className="bg-white px-6 py-2 rounded-full shadow font-bold">
              Page {currentPage} / {pages.length}
            </div>

            <button
              onClick={() => bookRef.current.pageFlip().flipNext()}
              className="bg-[#572C10] text-white px-6 py-2 rounded-xl font-bold"
            >
              Next →
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default FlipPage;