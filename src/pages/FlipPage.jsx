import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function FlipPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);

      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      const images = [];

      for (let i = 1; i <= pdf.numPages; i++) {
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

        images.push(canvas.toDataURL());
      }

      setPages(images);
      setLoading(false);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">

      <input
        type="file"
        accept="application/pdf"
        onChange={handlePDFUpload}
        className="mb-4 text-white"
      />

      {loading && <p className="text-white">Processing PDF...</p>}

      {pages.length > 0 && (
        <HTMLFlipBook width={400} height={600} showCover={true}>
          {pages.map((img, i) => (
            <div className="page" key={i}>
              <img
                src={img}
                alt={`page-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
}

export default FlipPage;