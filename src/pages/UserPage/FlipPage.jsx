import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import useApiLoader from "../../hook/useApiLoader";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function FlipPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [readerMode, setReaderMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const { loading, execute } = useApiLoader();

  const { pdf } = location.state || {};

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const bookRef = useRef(null);

  // 🎧 SINGLE SOUND FOR ALL FLIPS
  const flipSoundRef = useRef(null);

  useEffect(() => {
  
    flipSoundRef.current = new Audio("/oxidvideos-page-flip-1-178322.mp3");
    flipSoundRef.current.volume = 0.6;

    if (pdf) loadPDF();

    return () => {
      flipSoundRef.current?.pause();
    };
  }, [pdf]);

  // 🚀 LOAD PDF
  const loadPDF = async () => {
    try {
      await execute(async () => {
        const pdfDoc = await pdfjsLib.getDocument(pdf).promise;
        // MAX 30 PAGES
        const totalPages = Math.min(pdfDoc.numPages, 30);

        if (totalPages < 2) {
          alert("PDF must have at least 2 pages");
          return;
        }

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
      });
    } catch (err) {
      console.log(err);
      alert("Unable to load PDF");
    }
  };

  // 🔊 PLAY SOUND
  const playFlipSound = () => {
    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch(() => {});
    }
  };

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();

  const totalPages = pages.length;

  const progress =
    totalPages > 0
      ? Math.round((currentPage / (totalPages - 1)) * 100)
      : 0;

  return (
 <div className="lg:h-[82.5vh] sm:h-[75vh] h-[75vh] flex flex-col lg:ml-[30px] rounded-xl overflow-hidden bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7]">
      {/* LOADER */}
      {loading ? (
        <div className="flex justify-center lg:mt-[12%] sm:mt-[43%] mt-[37%] py-20">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="w-5 h-5 border-2 border-[#572C10]/20 border-t-[#572C10] rounded-full animate-spin"></div>
            <span className="text-[#572C10] font-medium">
              Loading Book...
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* PROGRESS BAR */}
          {pages.length > 0 && (
            <div className="px-4 sm:px-6 pt-3">
              <div className="flex justify-between text-xs text-[#3b2414] mb-1">
                <span>
                  Page {currentPage + 1} / {totalPages}
                </span>
                <span>{progress > 100 ? 100 : progress}%</span>
              </div>

              <div className="h-2 bg-[#eadfd3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#99582A] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* FLIPBOOK */}
          <div className="flex-1 mt-[10px] flex justify-center items-center overflow-hidden">

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
  mobileScrollSupport={true}
  useMouseEvents={true}
  flippingTime={700}
  onChangeState={(e) => {
    if (e.data === "flipping") {
      playFlipSound();
    }
  }}
  onFlip={(e) => {
    setCurrentPage(e.data);
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

          {/* CONTROLS */}
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
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-500 text-white hover:scale-105"
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
        </>
      )}
    </div>
  );
}

export default FlipPage;
