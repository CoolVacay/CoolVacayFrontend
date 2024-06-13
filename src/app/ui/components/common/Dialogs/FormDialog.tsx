"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import type { ListingData } from "~/app/(application)/definitions";
import EnquireForm from "../../listing/EnquireForm";
import CloseIcon from "@mui/icons-material/Close";

export default function FormDialog({
  title,
  subtitle,
  listing,
  children,
}: {
  title: string;
  subtitle: string;
  listing: ListingData;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-end">
          <button onClick={() => setOpen(false)} className="hover:text-primary">
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <DialogContent sx={{ padding: "60px", backgroundColor: "#F7F7F7" }}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl text-primary ">{title}</h2>
              <h6 className="text-lg text-[#676D73]">{subtitle}</h6>
            </div>
            <EnquireForm listing={listing} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
