"use client";

import { Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { IconGenerator } from "../IconGenerator";
const guests = Array.from({ length: 8 }, (v, i) => i + 1).map((item) =>
  item.toString(),
);

export default function SimpleSelectInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}) {
  return (
    <div className="relative w-[200px] rounded-[300px] border border-[#EAEAEF]">
      <Select
        fullWidth
        value={value}
        onChange={onChange}
        IconComponent={() => (
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            width="15px"
            className="pointer-events-none absolute right-2 top-[11px]	"
          />
        )}
        sx={{
          padding: "0px !important",
          fontSize: "14px",
          backgroundColor: "#EAF7FD",
          fontWeight: 400,
          height: "36px",
          borderRadius: "300px",
          "& .MuiSelect-icon": {
            position: "absolute",
            top: 6,
            right: 3,
          },
          "& .MuiInputBase-input": {
            "&:focus": {
              borderRadius: 300,
              borderColor: "#29ABE2",
              padding: "8px 14px",
              boxShadow: "0 0 0 0.1rem #29ABE2",
            },
          },
        }}
        labelId="customized-select-label"
        id="customized-select"
        defaultValue={guests[0]}
      >
        {guests.map((guest) => (
          <MenuItem key={guest} value={guest} dense>
            {`${guest} ${guest === "1" ? "guest" : "guests"}`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
