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

    if (pdf) {
      loadPDF();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [pdf]);

  const loadPDF = async () => {
    try {
      setLoading(true);

      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      const tempPages = [];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({
          scale: 1.4,
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
      setCurrentPage(0);

    } catch (err) {
      console.log(err);
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

  const flipPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const flipNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const pdfPagesCount = pages.length;

  let displayPage = 0;

  if (currentPage === 0) {
    displayPage = 0; // Cover
  } else if (currentPage > pdfPagesCount) {
    displayPage = pdfPagesCount; // Last page
  } else {
    displayPage = currentPage;
  }

  const progress =
    pdfPagesCount > 0
      ? Math.round(
          (displayPage / pdfPagesCount) * 100
        )
      : 0;

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-bold">
        Loading Book...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">

      {/* TITLE */}

      <div className="bg-white shadow py-3 flex justify-center">

       

      </div>

      {/* PROGRESS BAR */}

      {pages.length > 0 && (

        <div className="px-4 py-2">

          <div className="flex justify-between text-sm mb-1">

            <span>

              {displayPage === 0
                ? "Cover"
                : displayPage === pdfPagesCount &&
                  currentPage > pdfPagesCount
                ? "Completed"
                : `Page ${displayPage}/${pdfPagesCount}`}

            </span>

            <span>{progress}%</span>

          </div>

          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">

            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      )}

      {/* BOOK */}

      <div className="flex-1 flex justify-center items-center overflow-hidden py-2">

        {pages.length > 0 && (

          <HTMLFlipBook
            ref={bookRef}
            width={280}
            height={380}
            minWidth={220}
            maxWidth={320}
            minHeight={300}
            maxHeight={430}
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

            {/* COVER PAGE */}

            <div className="bg-white h-full w-full flex flex-col justify-center items-center border border-gray-300">

              <img
                src="/book-cover.png"
                alt="cover"
                className="w-28 mb-4"
              />

              <h1 className="text-2xl font-bold text-center px-5">
                {title}
              </h1>

              <p className="text-gray-500 mt-4 text-sm">
                Open Book
              </p>

            </div>

            {/* PDF PAGES */}

            {pages.map((page, index) => (

              <div
                key={index}
                className="bg-white h-full w-full flex justify-center items-center"
              >

                <img
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain"
                />

              </div>

            ))}

            {/* LAST PAGE */}

            <div className="bg-white h-full w-full flex justify-center items-center border border-gray-300">

              <div className="text-center">

                <h1 className="text-2xl font-bold mb-2">
                  The End
                </h1>

                <p className="text-gray-500">
                  Thanks For Reading
                </p>

              </div>

            </div>

          </HTMLFlipBook>

        )}

      </div>

      {/* BUTTONS */}

      <div className="bg-white shadow py-4 flex flex-col items-center gap-3">

        {/* Prev & Next */}

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
            disabled={currentPage >= pages.length + 1}
            className={`px-6 py-2 rounded-lg text-white ${
              currentPage >= pages.length + 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#572C10] hover:bg-[#3f1f08]"
            }`}
          >
            Next ➡
          </button>

        </div>

        {/* Back */}

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