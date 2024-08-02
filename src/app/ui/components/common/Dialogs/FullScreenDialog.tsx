"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useAppSearchParams } from "~/context/SearchParamsContext";

import type { IListingData } from "~/app/(application)/definitions";
import EmblaCarousel from "../../listing/Carousel/EmblaCarousel";
import CloseIcon from "@mui/icons-material/Close";
import "../../listing/Carousel/embla.css";

export default function FullScreenDialog({
  listing,
  isModalOpen,
  setIsModalOpen,
  handleClick,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  listing: IListingData;
  handleClick: (url?: number | string) => void;
}) {
  const { updateSearchParams, searchParamsValues, searchParams } =
    useAppSearchParams();

  //TODO: replace params with Link, check Link options
  useEffect(() => {
    setIsModalOpen(searchParamsValues.modal.includes("photoGallery") ?? false);
  }, [searchParamsValues.modal, setIsModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    updateSearchParams(["modal"], [""]);
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
            handleClick={handleClick}
            data={listing.images}
            slideNr={Number.parseInt(searchParams.get("modal")?.at(-1) ?? "0")}
            type="image"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
