import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadBooks = () => {

  const [pdfFile, setPdfFile] = useState(null);

  const onDrop = (acceptedFiles) => {

    const file = acceptedFiles[0];

    setPdfFile(file);

    console.log(file);
  };

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({

    onDrop,

    accept: {
      "application/pdf": [],
    },

    multiple: false,

    noClick: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-[400px]  border-blue-500 border-4 p-5 rounded-lg space-y-4">

        <h1 className="text-2xl font-bold text-blue-700">
          Upload Book
        </h1>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-blue-500 p-10 text-center"
        >

          <input {...getInputProps()} />

          <p className="text-blue-700 font-bold ">
            Drag & Drop PDF here
          </p>

          <button
            type="button"
            onClick={open}
            className="mt-4 bg-blue-500 text-2xl text-white px-4 py-2 rounded"
          >
            Select PDF
          </button>

        </div>

        {pdfFile && (
          <p className="text-green-600">
            {pdfFile.name}
          </p>
        )}

      </div>

    </div>
  );
};

export default UploadBooks;