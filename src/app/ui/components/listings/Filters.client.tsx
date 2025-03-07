"use client";

import { useState } from "react";
import dayjs from "dayjs";
import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { MenuItem, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import {
  CitiesAutocomplete,
  IconGenerator,
  SimpleSelectInput,
  StyledDatePicker,
} from "../common";
import type { DateRangeType } from "../home/SearchCard";
import GridMapToggle from "./GridMapToggle";
import type {
  ILocationsList,
  IPopularCategoriesData,
} from "~/app/(application)/definitions";
import { useRouter } from "next/navigation";
import CategoriesAutocomplete from "../common/Inputs/CategoriesAutocomplete";

const guests = Array.from({ length: 8 }, (v, i) => i + 1)
  .map((item) => item.toString())
  .map((guest) => (
    <MenuItem key={guest} value={guest} dense>
      {`${guest} ${guest === "1" ? "guest" : "guests"}`}
    </MenuItem>
  ));

export function FiltersComponent({
  locationsList,
  categories,
}: {
  locationsList: ILocationsList[];
  categories: IPopularCategoriesData[];
}) {
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();
  const router = useRouter();

  const dates = [
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
  ] as DateRangeType;

  const [showClearButton, setShowClearButton] = useState(false);
  const [isMapMode, setIsMapMode] = useState(
    searchParamsValues.isMapMode === "true",
  );

  const selectedCategory =
    categories.find((item) => item.name === searchParams?.get("category")) ??
    null;

  const [category, setCategory] = useState<string>(
    searchParamsValues.category ?? "",
  );

  const selectedLocation =
    locationsList.find((item) => {
      if (item.match === searchParams?.get("city")) {
        return searchParams?.get("city");
      } else if (item.match === searchParams?.get("state")) {
        return searchParams?.get("state");
      } else if (item.match === searchParams?.get("property")) {
        return searchParams?.get("property");
      } else if (item.match === searchParams?.get("listing")) {
        router.push(
          `${item.page}?numberOfGuests=${searchParams?.get("numberOfGuests")}`,
        );
      }
    }) ?? null;

  const [location, setLocation] = useState<string>(
    selectedLocation?.displayName ?? "",
  );

  return (
    <div className="mb-5 grid grid-cols-3 gap-4 sm:grid-cols-4">
      <div className="col-span-2 sm:col-span-2 min-[1100px]:col-span-1">
        <CitiesAutocomplete
          locationsList={locationsList}
          isSmallSize={true}
          variant="blue"
          className={`w-full`}
          inputValue={location}
          value={selectedLocation}
          setValue={setLocation}
          onChange={(event, newValue) => {
            updateSearchParams(["city", "state", "property"], ["", "", ""]);
            if (newValue?.type) {
              updateSearchParams([newValue.type], [newValue.match]);
            }
          }}
        />
      </div>
      <div className="col-span-1 md:hidden">
        <GridMapToggle
          isMapMode={isMapMode}
          setIsMapMode={setIsMapMode}
          updateSearchParams={updateSearchParams}
        />
      </div>
      <div className="col-span-1 md:col-span-2 min-[1100px]:col-span-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{
              field: SingleInputDateRangeField,
              day: StyledDatePicker,
            }}
            sx={{ width: "100%" }}
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
                    width: "100%",
                    display: "flex",
                    p: "12px 10px 15px",
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
      <div className="col-span-1 sm:col-span-2 min-[1100px]:col-span-1">
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
      <div className="col-span-1 sm:col-span-2 min-[1100px]:col-span-1">
        <CategoriesAutocomplete
          categories={categories}
          isSmallSize={true}
          iconUrl={selectedCategory?.iconUrl ?? null}
          variant="blue"
          className={`w-full`}
          inputValue={category}
          value={selectedCategory}
          setValue={setCategory}
          onChange={(event, newValue) => {
            if (!newValue) searchParams.delete("category");
            updateSearchParams(["category"], [newValue?.name ?? ""]);
          }}
        />
      </div>
    </div>
  );
}
