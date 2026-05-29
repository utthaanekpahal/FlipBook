import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {

  // RECEIVE DATA
  const location = useLocation();

  const { pdf, title } = location.state || {};

  // STATES
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookRef = useRef();

  // LOAD PDF
  useEffect(() => {
    if (pdf) {
      loadPDF();
    }
  }, [pdf]);

  // LOAD PDF FUNCTION
  const loadPDF = async () => {

    // GET PDF
    const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

    let loadedPages = [];

    const maxPages = Math.min(pdfDoc.numPages, 20);

    // LOOP PAGES
    for (let i = 1; i <= maxPages; i++) {

      const page = await pdfDoc.getPage(i);

      const viewport = page.getViewport({ scale: 1.5 });

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
  };

  // SOUND
  const playSound = () => {

    const audio = new Audio("/oxidvideos-page-flip-1-178322.mp3");

    audio.currentTime = 0;

    audio.play().catch((err) => {
      console.log("Audio error:", err);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden px-4">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6 text-[#572C10] text-center">
        {title}
      </h1>

      {/* FLIPBOOK */}
      {pages.length > 0 && (
        <>
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={500}
            showCover={false}
            mobileScrollSupport={false}
            minWidth={300}
            maxWidth={400}
            minHeight={400}
            maxHeight={500}
            onFlip={(e) => setCurrentPage(e.data + 1)}
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
                playSound();
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
                playSound();
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