"use client";

import { useState } from "react";
import Image from "next/image";
import type { ListingData } from "~/app/(application)/definitions";
import FullScreenDialog from "../common/Dialogs/FullScreenDialog";
import { useAppSearchParams } from "~/context/SearchParamsContext";

export default function Gallery({ listing }: { listing: ListingData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateSearchParams } = useAppSearchParams();

  const handleClick = (url: number | string = "") => {
    if (url) updateSearchParams(["modal"], [`photoGallery=${url}`]);
  };

  return (
    <>
      <div className="relative grid h-[470px] w-full grid-cols-4 grid-rows-2 gap-5">
        {listing.images.map((image, index) => {
          if (index < 5) {
            return (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} rounded-[8px]`}
              >
                <Image
                  key={index}
                  src={image.url}
                  alt={image.name}
                  onClick={() => {
                    setIsModalOpen(true);
                    handleClick(index + 1);
                  }}
                  sizes="100vw"
                  width={640}
                  height={500}
                  quality={index > 0 ? 40 : 80}
                  className="cursor-pointer"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          }
        })}
        <button
          className="absolute bottom-4 right-3 rounded-full bg-white px-[14px] py-[11px] text-sm font-medium text-[#29ABE2] hover:bg-primary hover:text-white"
          style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
            handleClick(1);
          }}
        >
          Show all photos
        </button>
      </div>
      <FullScreenDialog
        handleClick={handleClick}
        listing={listing}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
