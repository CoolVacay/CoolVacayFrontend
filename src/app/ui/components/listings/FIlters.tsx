"use client";

import { useState } from "react";
import dayjs from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { MenuItem } from "@mui/material";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import {
  CitiesAutocomplete,
  IconGenerator,
  SimpleSelectInput,
  StyledDatePicker,
} from "../common";
import type { DateRangeType } from "../home/SearchCard";
import { IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import type { ILocationsList } from "~/app/(application)/definitions";

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

  const dates = [
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
  ] as DateRangeType;

  const [showClearButton, setShowClearButton] = useState(false);

  const selectedLocation =
    locationsList.find((item) => item.match === searchParams?.get("match")) ??
    null;

  const [location, setLocation] = useState<string>(
    selectedLocation?.displayName ?? "",
  );

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
          updateSearchParams(["match"], [newValue?.match ?? ""]);
        }}
      />
      <div className="relative w-[200px]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{
              field: SingleInputDateRangeField,
              day: StyledDatePicker,
            }}
            name="allowedRange"
            value={dates}
            format="MMM DD"
            minDate={dayjs()}
            className="rounded-full border border-[#EAEAEF]"
            onAccept={(newValue) =>
              updateSearchParams(["fromDate", "toDate"], newValue)
            }
            slotProps={{
              textField: {
                variant: "standard",
                color: "primary",
                onMouseEnter: () => setShowClearButton(true),
                onMouseLeave: () => setShowClearButton(false),

                inputProps: {
                  placeholder: "Check-in / Check-out",
                },
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
                    <>
                      {showClearButton && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateSearchParams(
                                ["fromDate", "toDate"],
                                [null, null],
                              )
                            }
                          >
                            <ClearIcon
                              sx={{
                                width: "20px",
                                mr: "2px",
                                color: "black",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      )}
                      <IconGenerator
                        src="/down-arrow-light.svg"
                        alt="Down arrow"
                        width="18px"
                        className="w-[20px]"
                      />
                    </>
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <SimpleSelectInput
          value={
            searchParamsValues.numberOfGuests !== ""
              ? searchParamsValues.numberOfGuests
              : "1"
          }
          onChange={(e: SelectChangeEvent<string>) =>
            updateSearchParams(["numberOfGuests"], [e.target.value])
          }
          listOptions={guests}
        />
      </div>
    </div>
  );
}
