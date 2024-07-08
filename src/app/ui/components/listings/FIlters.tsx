"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import type { Dayjs } from "dayjs";

import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { MenuItem } from "@mui/material";

import { capitalize } from "~/app/utils/helpers";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { IconGenerator, SimpleInput, SimpleSelectInput } from "../common";
import type { DateRangeType } from "../home/SearchCard";

const guests = Array.from({ length: 8 }, (v, i) => i + 1)
  .map((item) => item.toString())
  .map((guest) => (
    <MenuItem key={guest} value={guest} dense>
      {`${guest} ${guest === "1" ? "guest" : "guests"}`}
    </MenuItem>
  ));

export default function Filters() {
  const router = useRouter();
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();

  const [dates, setDates] = useState<DateRangeType>([
    searchParamsValues.FromDate,
    searchParamsValues.ToDate,
  ]);

  const title =
    searchParams.get("category") ??
    (searchParams?.get("Match") && capitalize(searchParams.get("Match")!));
  const [location, setLocation] = useState(title);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (!term) searchParams.delete("category");
    updateSearchParams(["Match"], [term]);
  }, 300);

  useEffect(() => {
    updateSearchParams(["FromDate", "ToDate"], [dates[0], dates[1]]);
  }, [dates, updateSearchParams]);

  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="relative">
        <SimpleInput
          name="location"
          value={location ?? ""}
          placeholder="Enter location"
          variant="rounded"
          styles={"bg-[#EAF7FD] text-[#212529] h-9 text-sm"}
          onChange={(e) => {
            handleSearch(e.target.value);
            setLocation(e.target.value);
          }}
        />
        <button
          className="absolute right-4 top-[5px] text-[#B4CAE4]"
          onClick={() => {
            setLocation("");
            handleSearch("");
            searchParams.delete("Match");
            searchParams.delete("category");
            router.replace(`/listings?${searchParams.toString()}`);
          }}
        >
          ×
        </button>
      </div>
      <div className="relative w-[200px]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            name="allowedRange"
            value={dates}
            format="MMM DD"
            className="rounded-full border border-[#EAEAEF]"
            onChange={(newValue) => setDates(newValue as [Dayjs, Dayjs])}
            slotProps={{
              textField: {
                variant: "standard",
                color: "primary",
                InputProps: {
                  sx: {
                    fontSize: "14px",
                    fontWeight: 400,
                    width: "200px",
                    display: "flex",
                    pl: "15px",
                    backgroundColor: "#EAF7FD",
                    height: "36px",
                    borderRadius: "300px",
                    cursor: "pointer",
                  },
                  endAdornment: (
                    <IconGenerator
                      src="/down-arrow-light.svg"
                      alt="Down arrow"
                      width="16px"
                      className="mr-2"
                    />
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <SimpleSelectInput
          value={searchParamsValues.NumberOfGuests ?? "1"}
          onChange={(e: SelectChangeEvent<string>) =>
            updateSearchParams(["NumberOfGuests"], [e.target.value])
          }
          listOptions={guests}
        />
      </div>
    </div>
  );
}
