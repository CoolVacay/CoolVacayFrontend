"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@mui/material";

import type { ListingData } from "~/app/(application)/definitions";
import EmblaCarousel from "../../listing/Carousel/EmblaCarousel";
import CloseIcon from "@mui/icons-material/Close";
import "../../listing/Carousel/embla.css";

export default function FullScreenDialog({
  query,
  listing,
  isModalOpen,
  setIsModalOpen,
  handleClick,
}: {
  query: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  listing: ListingData;
  handleClick: (url?: number | string) => void;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = Array.from(Array(listing.images).keys());

  useEffect(() => {
    console.log(query, "query");
    setIsModalOpen(query?.startsWith("photoGallery"));
  }, [query, setIsModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    params.delete("query");
    router.replace(`${pathname}`);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={isModalOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: "100vh",
          },
        }}
      >
        <div className="flex justify-between p-6">
          <h1 className="text-2xl font-medium	">{listing.name}</h1>
          <button onClick={handleClose} className="hover:text-primary">
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <DialogContent className="align-center flex justify-center pt-0">
          <EmblaCarousel
            slides={SLIDES}
            handleClick={handleClick}
            options={OPTIONS}
            images={listing.images}
            slideNr={Number.parseInt(params.get("query")?.at(-1) ?? "0")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
