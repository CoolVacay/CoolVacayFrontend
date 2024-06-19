"use client";

import { InputLabel, Input, FormControl } from "@mui/material";
import { IconGenerator, RangeDatePicker, SelectInput } from "../common";
import Link from "next/link";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import type { DateRange } from "@mui/x-date-pickers-pro/models";

//TODO: re-style/refactor when you add functionality
export function SearchCard() {
  const [location, setLocation] = useState("");

  //@ts-expect-error noDayjsAdapter
  const [dates, setDates] = useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs().add(6, "day"),
  ]);
  const [numberOfGuests, setNumberOfGuests] = useState("1");
  const [fromDate, toDate] = dates;
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("Match", location);
    if (fromDate) params.append("FromDate", fromDate.format("YYYY-MM-DD"));
    if (toDate) params.append("ToDate", toDate.format("YYYY-MM-DD"));
    params.append("NumberOfGuests", numberOfGuests);
    return `/listings?Limit=10&Offset=0&${params.toString()}`;
  };

  return (
    <search>
      <form>
        <div className="grid h-[410px] w-[420px] shrink-0 grid-rows-4 divide-y rounded-xl border-[#EAEAEF] bg-white">
          <div className="border-b-4-grey flex w-full items-center px-4 pb-4 pt-5">
            <div className="flex h-full grow flex-col">
              <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
                <InputLabel
                  shrink={true}
                  htmlFor="component-simple"
                  className="block text-2xl font-medium"
                >
                  Location
                </InputLabel>
                <Input
                  id="component-simple"
                  // defaultValue=""
                  // name="match"
                  placeholder="Select Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    padding: "14px 26px 10px 0px",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                  fullWidth
                  endAdornment={
                    <IconGenerator
                      alt="Location Icon"
                      src="/location-pin.svg"
                      width="28px"
                      className="pointer-events-none"
                    />
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className="relative px-4 pb-4 pt-5">
            <RangeDatePicker
              size="big"
              dates={dates}
              setDates={setDates}
              // onChange={(newValue) => setDates(newValue)}
            />
          </div>
          <div className="flex h-full grow flex-col px-4 pb-4 pt-5">
            <SelectInput
              size="big"
              value={numberOfGuests}
              onChange={(e: SelectChangeEvent<string>) =>
                setNumberOfGuests(e.target.value)
              }
            />
          </div>
          <Link
            href={handleSearch()}
            passHref
            className="flex grow items-center rounded-b-xl bg-primary p-5 text-2xl"
          >
            Search
            <span className="ml-auto">
              <IconGenerator
                alt="avatar icon"
                src={`/search_icon.svg`}
                width="33px"
              />
            </span>
          </Link>
        </div>
      </form>
    </search>
  );
}
