"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";

export default function UploadButton({
  editMode,
  setIsImageAttached,
  setFiles,
}: {
  editMode: boolean;
  setIsImageAttached: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: (value: React.SetStateAction<File[]>) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    disabled: !editMode,
    maxSize: 3000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      setIsImageAttached(true);
    },
  });

  return (
    <section className="flex items-center gap-4">
      <div {...getRootProps({})}>
        <input {...getInputProps()} />
        <div
          className={`w-[152px] rounded-full px-5 py-3  ${!editMode ? "bg-[#E7E7E7] text-[#676D73]" : "cursor-pointer border border-[#29ABE2] text-primary"}`}
        >
          <p>Change Photo</p>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
