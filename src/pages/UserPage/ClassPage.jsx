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
  const { execute } = useApiLoader();

  const { pdf } = location.state || {};

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  // ✅ ZOOM STATE
  const [zoom, setZoom] = useState(1);

  const bookRef = useRef(null);
  const containerRef = useRef(null);
  const flipSoundRef = useRef(null);

  useEffect(() => {
    flipSoundRef.current = new Audio("/oxidvideos-page-flip-1-178322.mp3");
    flipSoundRef.current.volume = 0.6;

    if (pdf) loadPDF();

    return () => flipSoundRef.current?.pause();
  }, [pdf]);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", onChange);
    return () =>
      document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // =========================
  // ZOOM BUTTONS
  // =========================
  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));

  // =========================
  // FULLSCREEN
  // =========================
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // =========================
  // LOAD PDF
  // =========================
  const loadPDF = async () => {
    try {
      await execute(async () => {
        const pdfDoc = await pdfjsLib.getDocument(pdf).promise;
        const totalPages = Math.min(pdfDoc.numPages, 30);

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

  const playFlipSound = () => {
    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch(() => {});
    }
  };

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();

  return (
    <div
      ref={containerRef}
      className="h-[82vh] flex flex-col overflow-hidden bg-gradient-to-br from-[#fff7f0] via-[#fffaf5] to-[#f7efe7]"
    >

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 pt-3">
        <button
          onClick={toggleFullscreen}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      {/* BOOK AREA */}
      <div className="flex-1 flex justify-center items-center">

        {/* OUTER STABLE BOX */}
        <div className="w-full h-full lg:w-[98vw] lg:h-[88vh] flex justify-center items-center bg-white shadow-2xl rounded-xl overflow-hidden">

          {/* ZOOM LAYER (SAFE) */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
            }}
            className="flex justify-center items-center"
          >
            {pages.length > 0 && (
              <HTMLFlipBook
                ref={bookRef}
                width={340}
                height={460}
                size="stretch"
                showCover
                drawShadow
                maxShadowOpacity={0.5}
                useMouseEvents
                flippingTime={700}
                onChangeState={(e) => {
                  if (e.data === "flipping") playFlipSound();
                }}
                onFlip={(e) => setCurrentPage(e.data)}
              >
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="bg-white flex items-center justify-center"
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
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-3 py-3 bg-white/90 border-t flex-wrap">

        <button
          onClick={zoomOut}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          −
        </button>

        <span className="px-4 py-2 font-bold">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={zoomIn}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          +
        </button>

        <button
          onClick={flipPrev}
          className="px-4 py-2 bg-[#99582A] text-white rounded"
        >
          Prev
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back
        </button>

        <button
          onClick={flipNext}
          className="px-4 py-2 bg-[#99582A] text-white rounded"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default FlipPage;