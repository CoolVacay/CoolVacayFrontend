"use client";

import { Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { IconGenerator } from "../IconGenerator";
import React from "react";

export default function SimpleSelectInput({
  value,
  onChange,
  listOptions,
  size = "small",
  onBlur,
  error,
  name,
  placeholder,
}: {
  value?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  listOptions: React.ReactNode | JSX.Element[];
  size?: "small" | "medium";
  error?: boolean | undefined;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  name?: string;
  placeholder?: string;
}) {
  const isSmallSize = size === "small";
  return (
    <div
      className={`relative ${isSmallSize ? "w-[200px] " : "w-full"} rounded-[300px] border border-[#EAEAEF]`}
    >
      <Select
        fullWidth
        value={value}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        onChange={onChange}
        IconComponent={() => (
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            width={isSmallSize ? "15px" : "22px"}
            className={`pointer-events-none absolute ${isSmallSize ? "right-2 top-[11px]" : "right-4 top-[18px]"} `}
          />
        )}
        sx={{
          padding: "0px !important",
          fontSize: isSmallSize ? "14px" : "16px",
          backgroundColor: isSmallSize ? "#EAF7FD" : "#fff",
          fontWeight: 400,
          height: isSmallSize ? "36px" : "58px",
          borderRadius: "300px",
          "& .MuiInputBase-input": {
            "&:focus": {
              borderRadius: 300,
              borderColor: "#29ABE2",
              padding: isSmallSize ? "9px 14px" : "18px 14px",
              boxShadow: "0 0 0 0.1rem #29ABE2",
            },
          },
        }}
        labelId={`${name}-select-label`}
        id={`${name}-select`}
      >
        {listOptions}
      </Select>
    </div>
  );
}
