import { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookRef = useRef();

  // 🎧 SOUND
  const flipSound = useRef(new Audio("/sounds/page-flip.mp3"));

  useEffect(() => {
    loadPDF();
  }, []);

  const loadPDF = async () => {
    const pdf = await pdfjsLib.getDocument("/Math Fun With Abby.pdf").promise;

    let loadedPages = [];
    const maxPages = Math.min(pdf.numPages, 20);

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      loadedPages.push(canvas.toDataURL());
    }

    setPages(loadedPages);
  };

  // 🔊 SOUND FUNCTION (reusable)
  const playSound = () => {
    flipSound.current.currentTime = 0;
    flipSound.current.play();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden">

      <h1 className="text-4xl font-bold mb-6 text-[#572C10]">
        PDF Flipbook
      </h1>

      {pages.length > 0 && (
        <>
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={500}
            showCover={false}
            mobileScrollSupport={false}
            minWidth={400}
            maxWidth={400}
            minHeight={500}
            maxHeight={500}

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
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </HTMLFlipBook>

          {/* CONTROLS */}
          <div className="flex items-center gap-6 mt-6">

            {/* PREV */}
            <button
              onClick={() => {
                playSound();
                bookRef.current.pageFlip().flipPrev();
              }}
              className="bg-[#572C10] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
            >
              ← Previous
            </button>

            {/* PAGE INFO */}
            <div className="bg-white px-6 py-2 rounded-full shadow-lg font-bold">
              Page {currentPage} / {pages.length}
            </div>

            {/* NEXT */}
            <button
              onClick={() => {
                playSound();
                bookRef.current.pageFlip().flipNext();
              }}
              className="bg-[#572C10] text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
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