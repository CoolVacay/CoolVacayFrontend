"use client";

import { useState } from "react";
import { Dialog, DialogContent, Divider } from "@mui/material";
import type { ListingData } from "~/app/(application)/definitions";
import InquireForm from "../../listing/InquireForm";
import CloseIcon from "@mui/icons-material/Close";
import ChangePasswordForm from "../../profile/ChangePasswordForm";
import DeactivateAccountForm from "../../profile/DeactivateAccountForm";

export default function FormDialog({
  title,
  subtitle,
  data,
  children,
  content,
}: {
  title: string;
  subtitle?: string;
  data?: ListingData | string;
  children: React.ReactNode;
  content: "password" | "inquiry" | "deactivate";
}) {
  const [open, setOpen] = useState(false);
  const isContentInquiry = content === "inquiry";

  const modalContentOptions = {
    inquiry: <InquireForm listing={data as ListingData} setOpen={setOpen} />,
    password: <ChangePasswordForm setOpen={setOpen} userId={data as string} />,
    deactivate: (
      <DeactivateAccountForm setOpen={setOpen} userId={data as string} />
    ),
  };
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div
          className={`flex flex-col gap-4 ${isContentInquiry ? "bg-[#F7F7F7] px-[60px] pt-10" : "px-6 py-4"}`}
        >
          <h2
            className={
              isContentInquiry
                ? "text-2xl text-primary "
                : "text-[20px] font-medium"
            }
          >
            {title}
          </h2>
          {subtitle ? (
            <h6 className="text-lg text-[#676D73]">{subtitle}</h6>
          ) : null}
        </div>
        <div
          className={`absolute ${isContentInquiry ? "right-3 top-3" : "right-5 top-5"}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="hover:text-primary"
            aria-label="close button"
          >
            <CloseIcon fontSize={isContentInquiry ? "large" : "medium"} />
          </button>
        </div>
        {isContentInquiry ? null : <Divider variant="fullWidth" flexItem />}
        <DialogContent
          sx={{
            padding: isContentInquiry ? "40px 60px" : "15px 24px",
            backgroundColor: isContentInquiry ? "#F7F7F7" : "#FFF",
            position: "relative",
          }}
        >
          <div className="flex flex-col gap-5">
            {modalContentOptions[content]}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
