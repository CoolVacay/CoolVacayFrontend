"use client";

import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import { IconGenerator, RangeDatePicker, SelectInput } from "../common";
import { useRouter } from "next/navigation";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { ILocationsList } from "~/app/(application)/actions";

export type DateRangeType = [Dayjs, Dayjs];
interface CustomHTMLAttributes extends React.HTMLAttributes<HTMLLIElement> {
  key?: React.Key;
}
//TODO: re-style/refactor when you add functionality

export function SearchCard({
  size,
  locationsList,
}: {
  size: "small" | "big";
  locationsList: ILocationsList[];
}) {
  const [location, setLocation] = useState("");
  const [autocompleteValue, setAutocompleteValue] = useState("");

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
    if (autocompleteValue) params.append("match", autocompleteValue);
    if (fromDate) params.append("fromDate", fromDate.format("YYYY-MM-DD"));
    if (toDate) params.append("toDate", toDate.format("YYYY-MM-DD"));
    params.append("numberOfGuests", numberOfGuests);
    return `/listings?limit=10&offset=0&${params.toString()}`;
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
                <Autocomplete
                  id="location-select"
                  options={locationsList}
                  autoHighlight
                  getOptionLabel={(option) => option.displayName}
                  inputValue={location}
                  onChange={(event, newValue) => {
                    setAutocompleteValue(newValue ? newValue.match : "");
                  }}
                  onInputChange={(event, newInputValue) => {
                    setLocation(newInputValue);
                  }}
                  renderOption={(props: CustomHTMLAttributes, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                      >
                        <IconGenerator
                          width="20px"
                          src="/location-pin.svg"
                          alt={option.displayName}
                        />
                        {option.displayName}
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="standard"
                      placeholder="Select Location"
                      inputProps={{
                        ...params.inputProps,
                      }}
                      InputLabelProps={{
                        className: `block ${isSmallSize ? "text-sm" : "text-2xl"} font-medium`,
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          padding: isSmallSize
                            ? "0px"
                            : "14px 0px 14px 0px !important",
                          fontSize: isSmallSize ? "12px" : "20px",
                          fontWeight: 500,
                        },
                        startAdornment: (
                          <IconGenerator
                            alt="Location Icon"
                            src="/location-pin.svg"
                            width={isSmallSize ? "16px" : "28px"}
                            className={`${isSmallSize ? "right-[2px]" : "left-0 top-3"} mr-2`}
                          />
                        ),
                        endAdornment: (
                          <IconGenerator
                            alt="avatar icon"
                            src={`/down-arrow.svg`}
                            width={"32px"}
                            className={`absolute right-1 top-3`}
                          />
                        ),
                      }}
                    />
                  )}
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
