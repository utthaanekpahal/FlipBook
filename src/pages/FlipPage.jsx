import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {
  // RECEIVE DATA
  const location = useLocation();
  const navigate = useNavigate();

  const { pdf, title } = location.state || {};

  // STATES
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookRef = useRef();
  const audioRef = useRef(null);

  // LOAD PDF
  useEffect(() => {
    audioRef.current = new Audio(
      "/oxidvideos-page-flip-1-178322.mp3"
    );

    if (pdf) {
      loadPDF();
    }
  }, [pdf]);

  // LOAD PDF FUNCTION
  const loadPDF = async () => {
    try {
      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      let loadedPages = [];

      const maxPages = Math.min(pdfDoc.numPages, 20);

      // LOOP PAGES
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({
          scale: 1.5,
        });

        // CREATE CANVAS
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // RENDER PAGE
        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        // CONVERT TO IMAGE
        loadedPages.push(canvas.toDataURL());
      }

      // SAVE PAGES
      setPages(loadedPages);
    } catch (error) {
      console.error("PDF Error:", error);
    }
  };

  // SOUND
  const playSound = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;

    audioRef.current.play().catch((err) => {
      console.log("Audio error:", err);
    });
  };

  // PROGRESS
  const progress =
    pages.length > 0
      ? (currentPage / pages.length) * 100
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-300 overflow-hidden px-4 py-6">

      {/* BACK BUTTON */}
      <div className="w-full max-w-4xl mt-4 mr-[20%]" >
        <button
          onClick={() => navigate(-1)}
          className="bg-[#572C10] text-white px-5  py-2 rounded-xl font-bold shadow-lg hover:opacity-90"
        >
          ← Back
        </button>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mt-[-6%] text-[#572C10] text-center"> </h1>

      {/* PROGRESS BAR */}
      {pages.length > 0 && (
        <div className="w-full max-w-md mb-5">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>
              Page {currentPage} / {pages.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-3 bg-white rounded-full overflow-hidden shadow">
            <div
              className="h-full bg-gradient-to-r from-purple-700 via-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
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
            showCover={false}
            mobileScrollSupport={true}
            useMouseEvents={true}
            minWidth={300}
            maxWidth={400}
            minHeight={400}
            maxHeight={500}
            onChangeState={(e) => {
              if (e.data === "flipping") {
                playSound();
              }
            }}
            onFlip={(e) => {
              setCurrentPage(e.data + 1);
            }}
          >
            {pages.map((page, index) => (
              <div
                key={index}
                className="bg-white shadow-lg flex items-center justify-center"
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

            {/* PREVIOUS */}
            <button
              onClick={() => {
                bookRef.current.pageFlip().flipPrev();
              }}
              className="bg-[#572C10] text-white px-6 py-2 rounded-xl font-bold"
            >
              ← Previous
            </button>

            {/* PAGE NUMBER */}
            <div className="bg-white px-6 py-2 rounded-full shadow-lg font-bold">
              Page {currentPage} / {pages.length}
            </div>

            {/* NEXT */}
            <button
              onClick={() => {
                bookRef.current.pageFlip().flipNext();
              }}
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