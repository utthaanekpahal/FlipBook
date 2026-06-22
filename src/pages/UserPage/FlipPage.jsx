import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// PDF Worker
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

  // ================= LOAD SOUND =================

  useEffect(() => {
    audioRef.current = new Audio("/page-flip.mp3");

    if (pdf) {
      loadPDF();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [pdf]);

  // ================= LOAD PDF =================

  const loadPDF = async () => {
    try {
      setLoading(true);

      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      // Max 100 pages
      const totalPages = Math.min(pdfDoc.numPages, 100);

      const tempPages = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({
          scale: 1.2,
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        tempPages.push(
          canvas.toDataURL("image/webp", 0.9)
        );
      }

      setPages(tempPages);

    } catch (err) {
      console.log(err);
      alert("Unable to load PDF");
    }

    finally {
      setLoading(false);
    }
  };

  // ================= PAGE SOUND =================

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {});
    }
  };

  // ================= BUTTONS =================

  const flipPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const flipNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  // ================= PROGRESS =================

  const totalPages = pages.length;

  const progress =
    totalPages > 0
      ? Math.round(
          (currentPage / (totalPages - 1)) * 100
        )
      : 0;

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-[#572C10] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <h1 className="text-xl font-bold">

            Loading Book...

          </h1>

        </div>

      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex flex-col overflow-hidden">

      {/* TITLE */}

     
      {/* PROGRESS BAR */}

      {pages.length > 0 && (

        <div className="px-5 py-3">

          <div className="flex justify-between text-sm mb-1">

            <span>

              Page {Math.min(currentPage + 1, totalPages)}

              {" / "}

              {totalPages}

            </span>

            <span>

              {progress > 100 ? 100 : progress}%

            </span>

          </div>

          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">

            <div
              className="h-full bg-[#572C10] transition-all duration-500"
              style={{
                width: `${
                  progress > 100 ? 100 : progress
                }%`,
              }}
            />

          </div>

        </div>

      )}

      {/* FLIP BOOK */}

      <div className="flex-1 flex justify-center items-center overflow-hidden">

        {pages.length > 0 && (

          <HTMLFlipBook
            ref={bookRef}
            width={300}
            height={430}
            minWidth={220}
            maxWidth={350}
            minHeight={320}
            maxHeight={500}
            size="stretch"
            showCover={true}
            drawShadow={true}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            useMouseEvents={true}
            flippingTime={700}
            startPage={0}
            onFlip={(e) => {

              setCurrentPage(e.data);

              playSound();

            }}
          >

            {/* 
            FIRST PAGE OF PDF = COVER
            LAST PAGE OF PDF = BACK COVER
            */}

            {pages.map((page, index) => (

              <div
                key={index}
                className="bg-white h-full w-full flex justify-center items-center border border-gray-200"
              >

                <img
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain"
                />

              </div>

            ))}

          </HTMLFlipBook>

        )}

      </div>

      {/* BUTTONS */}

      <div className="bg-white shadow py-4 flex flex-col items-center gap-3">

        <div className="flex gap-4">

          <button
            onClick={flipPrev}
            disabled={currentPage === 0}
            className={`px-6 py-2 rounded-lg text-white ${
              currentPage === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#572C10] hover:bg-[#3f1f08]"
            }`}
          >

            ⬅ Prev

          </button>

          <button
            onClick={flipNext}
            disabled={currentPage >= pages.length - 1}
            className={`px-6 py-2 rounded-lg text-white ${
              currentPage >= pages.length - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#572C10] hover:bg-[#3f1f08]"
            }`}
          >

            Next ➡

          </button>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg"
        >

          Back

        </button>

      </div>

    </div>
  );
}

export default FlipPage;