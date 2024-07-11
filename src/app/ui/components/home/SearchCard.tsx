"use client";

import { InputLabel, Input, FormControl } from "@mui/material";
import { IconGenerator, RangeDatePicker, SelectInput } from "../common";
import { useRouter } from "next/navigation";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export type DateRangeType = [Dayjs, Dayjs];

//TODO: re-style/refactor when you add functionality
export function SearchCard({ size }: { size: "small" | "big" }) {
  const [location, setLocation] = useState("");

  const [dates, setDates] = useState<DateRangeType>([
    dayjs(),
    dayjs().add(6, "day"),
  ]);
  const [numberOfGuests, setNumberOfGuests] = useState("1");
  const [fromDate, toDate] = dates;
  const router = useRouter();
  const isSmallSize = size === "small";
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("Match", location);
    if (fromDate) params.append("FromDate", fromDate.format("YYYY-MM-DD"));
    if (toDate) params.append("ToDate", toDate.format("YYYY-MM-DD"));
    params.append("NumberOfGuests", numberOfGuests);
    return `/listings?Limit=10&Offset=0&${params.toString()}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(handleSearch());
  };

  return (
    <search>
      <form onSubmit={handleSubmit}>
        <div
          className={`grid ${isSmallSize ? "h-[250px] w-[258px]" : "h-[410px] w-[420px]"} shrink-0 grid-rows-4 divide-y rounded-xl border-[#EAEAEF] bg-white`}
        >
          <div
            className={`border-b-4-grey flex w-full items-center ${isSmallSize ? "px-3 py-2" : "px-4 pb-4"} pt-5`}
          >
            <div className="flex h-full grow flex-col">
              <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
                <InputLabel
                  shrink={true}
                  htmlFor="component-simple"
                  className={`block ${isSmallSize ? "text-sm" : "text-2xl"} font-medium`}
                >
                  Location
                </InputLabel>
                <Input
                  id="component-simple"
                  placeholder="Select Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    padding: isSmallSize ? "0px" : "14px 26px 10px 0px",
                    fontSize: isSmallSize ? "12px" : "20px",
                    fontWeight: 500,
                  }}
                  fullWidth
                  endAdornment={
                    <IconGenerator
                      alt="Location Icon"
                      src="/location-pin.svg"
                      width={isSmallSize ? "16px" : "28px"}
                      className={`pointer-events-none absolute ${isSmallSize ? "right-[2px]" : "right-2 top-2"}`}
                    />
                  }
                />
              </FormControl>
            </div>
          </div>
          <div
            className={`relative ${isSmallSize ? "px-3 py-2" : "px-4 pb-4 pt-5"}`}
          >
            <RangeDatePicker
              size={isSmallSize ? "small" : "big"}
              dates={dates}
              setDates={setDates}
            />
          </div>
          <div
            className={`flex h-full grow flex-col ${isSmallSize ? "px-3 py-2" : "px-4 pb-4 pt-5"}`}
          >
            <SelectInput
              size={isSmallSize ? "small" : "big"}
              value={numberOfGuests}
              onChange={(e: SelectChangeEvent<string>) =>
                setNumberOfGuests(e.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className={`flex grow items-center rounded-b-xl bg-primary text-white ${isSmallSize ? "p-3 text-sm" : "p-5 text-2xl"}`}
          >
            Search
            <span className="ml-auto">
              <IconGenerator
                alt="avatar icon"
                src={`/search_icon.svg`}
                width={isSmallSize ? "20px" : "33px"}
              />
            </span>
          </button>
        </div>
      </form>
    </search>
  );
}
