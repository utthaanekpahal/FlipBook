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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const bookRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/page-flip.mp3");

    if (pdf) loadPDF();

    return () => {
      audioRef.current?.pause();
    };
  }, [pdf]);

  const loadPDF = async () => {
    try {
      setLoading(true);

      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;
      const totalPages = Math.min(pdfDoc.numPages, 100);

      const tempPages = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.2 });

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
    } catch (err) {
      console.log(err);
      alert("Unable to load PDF");
    } finally {
      setLoading(false);
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();

  const totalPages = pages.length;

  const progress =
    totalPages > 0
      ? Math.round((currentPage / (totalPages - 1)) * 100)
      : 0;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#99582A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-lg font-semibold text-[#3b2414]">
            Loading Book...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[35%] flex flex-col overflow-hidden bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7]">

      {/* PROGRESS ONLY (HEADER REMOVED AS REQUESTED) */}
      {pages.length > 0 && (
        <div className="px-4 sm:px-6 pt-3">
          <div className="flex justify-between text-xs text-[#3b2414] mb-1">
            <span>
              Page {Math.min(currentPage + 1, totalPages)} / {totalPages}
            </span>
            <span>{progress > 100 ? 100 : progress}%</span>
          </div>

          <div className="h-2 bg-[#eadfd3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#99582A] transition-all duration-500"
              style={{ width: `${progress > 100 ? 100 : progress}%` }}
            />
          </div>
        </div>
      )}

      {/* FLIPBOOK AREA */}
      <div className="flex-1 flex justify-center items-center overflow-hidden">

        {pages.length > 0 && (
          <HTMLFlipBook
            ref={bookRef}
            width={340}
            height={460}
            minWidth={280}
            maxWidth={380}
            minHeight={380}
            maxHeight={520}
            size="stretch"
            showCover={true}
            drawShadow={true}
            maxShadowOpacity={0.5}
            mobileScrollSupport={false}
            useMouseEvents={true}
            flippingTime={700}
            onFlip={(e) => {
              setCurrentPage(e.data);
              playSound();
            }}
          >
            {pages.map((page, index) => (
              <div
                key={index}
                className="bg-white flex items-center justify-center border border-[#eadfd3]"
              >
                <img
                  src={page}
                  className="w-full h-full object-contain"
                  alt={`Page ${index + 1}`}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}

      </div>

      {/* CONTROLS (BACK BUTTON MOVED HERE) */}
      <div className="shrink-0 bg-white/90 backdrop-blur-md border-t border-[#eadfd3] py-3">

        <div className="flex justify-center items-center gap-4">

          <button
            onClick={flipPrev}
            disabled={currentPage === 0}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
              currentPage === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#99582A] text-white hover:scale-105"
            }`}
          >
            ⬅ Prev
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:scale-105"
          >
            Back
          </button>

          <button
            onClick={flipNext}
            disabled={currentPage >= pages.length - 1}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
              currentPage >= pages.length - 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#99582A] text-white hover:scale-105"
            }`}
          >
            Next ➡
          </button>

        </div>

      </div>

    </div>
  );
}

export default FlipPage;