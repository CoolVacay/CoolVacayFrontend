"use client";

import { useState } from "react";
import type { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import type { SelectChangeEvent } from "@mui/material";

import {
  CitiesAutocomplete,
  IconGenerator,
  RangeDatePicker,
  SelectInput,
} from "../common";
import type { ILocationsList } from "~/app/(application)/definitions";
export type DateRangeType = [Dayjs | null, Dayjs | null];

//TODO: re-style/refactor when you add functionality
export function SearchCard({
  size,
  locationsList,
  defaultLocation,
}: {
  size: "small" | "big";
  locationsList: ILocationsList[];
  defaultLocation?: string;
}) {
  const router = useRouter();
  const [autocompleteValue, setAutocompleteValue] =
    useState<ILocationsList | null>(null);
  const [location, setLocation] = useState(defaultLocation ?? "");

  const [numberOfGuests, setNumberOfGuests] = useState("1");
  const [dates, setDates] = useState<DateRangeType | ["", ""]>([null, null]);

  const isSmallSize = size === "small";

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (dates[0]) params.append("fromDate", dates[0].format("YYYY-MM-DD"));
    if (dates[1]) params.append("toDate", dates[1].format("YYYY-MM-DD"));
    params.append("numberOfGuests", numberOfGuests);

    if (autocompleteValue?.type === "listing") {
      return `${autocompleteValue.page.replace("/listings/", "/listing/")}?${params.toString()}`;
    }
    if (autocompleteValue) params.append("match", autocompleteValue?.match);
    return `/listings?${params.toString()}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(handleSearch());
  };

  return (
    <search>
      <form onSubmit={handleSubmit}>
        <div
          className={`grid ${isSmallSize ? "h-[250px] w-[258px]" : "h-[330px] w-[330px] sm:h-[410px] sm:w-[420px]"} shrink-0 grid-rows-4 divide-y rounded-xl border-[#EAEAEF] bg-white`}
        >
          <div
            className={`border-b-4-grey flex w-full items-center ${isSmallSize ? "px-3 py-2" : "px-4 pb-4"} pt-5`}
          >
            <div className="flex h-full grow flex-col">
              <CitiesAutocomplete
                locationsList={locationsList}
                isSmallSize={isSmallSize}
                variant="white"
                onChange={(event, newValue) => {
                  setAutocompleteValue(newValue);
                }}
                setValue={setLocation}
                inputValue={location}
                value={
                  locationsList?.find(
                    (item) => item.displayName === location,
                  ) ?? null
                }
              />
            </div>
          </div>
          <div
            className={`relative ${isSmallSize ? "px-3 py-2" : "px-4 pb-4 pt-5"}`}
          >
            <RangeDatePicker
              size={isSmallSize ? "small" : "big"}
              selectedDates={dates}
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
            className={`flex grow items-center rounded-b-xl bg-primary text-white ${isSmallSize ? "p-3 text-sm" : "p-5 text-lg sm:text-2xl"}`}
          >
            Search
            <span className="ml-auto">
              <IconGenerator
                alt="avatar icon"
                src={`/search_icon.svg`}
                className={isSmallSize ? "w-5" : "w-6 sm:w-8"}
              />
            </span>
          </button>
        </div>
      </form>
    </search>
  );
}
