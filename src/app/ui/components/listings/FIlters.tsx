"use client";

import { useState, useEffect } from "react";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { MenuItem } from "@mui/material";
import type { ILocationsList } from "~/app/(application)/actions";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import {
  CitiesAutocomplete,
  IconGenerator,
  SimpleSelectInput,
} from "../common";
import type { DateRangeType } from "../home/SearchCard";

const guests = Array.from({ length: 8 }, (v, i) => i + 1)
  .map((item) => item.toString())
  .map((guest) => (
    <MenuItem key={guest} value={guest} dense>
      {`${guest} ${guest === "1" ? "guest" : "guests"}`}
    </MenuItem>
  ));

export default function Filters({
  locationsList,
}: {
  locationsList: ILocationsList[];
}) {
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();

  const [dates, setDates] = useState<DateRangeType>([
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
  ]);
  const selectedLocation =
    locationsList.find((item) => item.match === searchParams?.get("match")) ??
    null;

  const [location, setLocation] = useState<string>(
    selectedLocation?.displayName ?? "",
  );
  const [autocompleteValue, setAutocompleteValue] = useState(
    locationsList.find((item) => item.match === searchParams?.get("match"))
      ?.displayName ?? "",
  );

  useEffect(() => {
    updateSearchParams(["fromDate", "toDate"], [dates[0], dates[1]]);
  }, [dates, updateSearchParams]);

  return (
    <div className="mb-5 flex items-center gap-4">
      <CitiesAutocomplete
        locationsList={locationsList}
        isSmallSize={true}
        variant="blue"
        inputValue={location}
        value={selectedLocation}
        setValue={setLocation}
        onChange={(event, newValue) => {
          if (!newValue) searchParams.delete("category");
          setAutocompleteValue(newValue ? newValue.match : "");
          updateSearchParams(["match"], [newValue?.match ?? ""]);
        }}
      />
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
                    p: "15px 10px 15px",
                    backgroundColor: "#EAF7FD",
                    height: "36px",
                    borderRadius: "300px",
                    cursor: "pointer",
                  },
                  endAdornment: (
                    <IconGenerator
                      src="/down-arrow-light.svg"
                      alt="Down arrow"
                      width="18px"
                      className="w-[20px]"
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
          value={searchParamsValues.numberOfGuests ?? "1"}
          onChange={(e: SelectChangeEvent<string>) =>
            updateSearchParams(["numberOfGuests"], [e.target.value])
          }
          listOptions={guests}
        />
      </div>
    </div>
  );
}
