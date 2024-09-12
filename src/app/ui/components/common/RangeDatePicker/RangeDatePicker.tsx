"use client";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { IconGenerator } from "../IconGenerator";
import type { DateRangeType } from "../../home/SearchCard";
import type { Dayjs } from "dayjs";
import StyledDatePicker from "./StyledDatePicker";
import type { IListingData } from "~/app/(application)/definitions";
import { useMediaQuery } from "@mui/material";
import { getAvailabilityPeriods } from "~/app/(application)/actions";
import dayjs from "dayjs";
import { useState } from "react";
import Loading from "~/app/(authentication)/signup/loading";

const RangeDatePicker = ({
  size,
  dates,
  setDates,
  availableDates,
  setAvailableDates,
  originalDates,
  listingInfo
}: {
  size: "small" | "medium" | "big";
  dates: DateRangeType;
  setDates:
    | React.Dispatch<React.SetStateAction<DateRangeType>>
    | ((values: DateRangeType) => void);
  availableDates?: string[];
  originalDates?: string[];
  setAvailableDates?: React.Dispatch<React.SetStateAction<string[]>>;
  listingInfo?: IListingData;
}) => {
  const bigFont = size === "big";
  const mediumFont = size === "medium";
  const [loading, setLoading] = useState(false);

  const matches = useMediaQuery("@media (pointer: fine)");

  const handleDateChange = async (newValue: DateRangeType) => {
    setDates(newValue as [Dayjs, Dayjs]);
    if (availableDates && setAvailableDates && originalDates) {
      if (newValue[0] && !newValue[1]) {
        setLoading(true);
        const availabilityPeriods = await getAvailabilityPeriods(
          "Rhea",
          listingInfo?.id ?? "",
          dayjs(newValue[0]).format("YYYY-MM-DD")
        );
        setAvailableDates(availabilityPeriods ?? []);
        setLoading(false);
      } else {
        if (originalDates.length !== availableDates.length)
          setAvailableDates(originalDates ?? []);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
        loading={loading}
        renderLoading={() => (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white"
            style={{ height: "100%", width: "auto" }}
          >
            <Loading />
          </div>
        )}
        slots={{ day: StyledDatePicker }}
        format="MM/DD/YYYY"
        slotProps={{
          fieldSeparator: {
            sx: { color: "transparent" },
            className: `${
              bigFont || mediumFont ? "sm:h-16 h-14" : "h-11"
            } w-[1px] absolute bg-primary-grey100 inset-x-2/4`,
          },
          day: {
            // @ts-expect-error MUI doesn't recognize forwardProp
            availableDates: availableDates,
          },
          textField: {
            variant: "standard",
            InputLabelProps: {
              className: `${
                bigFont
                  ? "sm:text-2xl text-xl sm:-top-3 -top-2"
                  : mediumFont
                  ? "text-xl -top-2"
                  : "text-base -top-1"
              } font-medium absolute`,
            },
            InputProps: {
              className: `${
                bigFont ? "sm:text-xl sm:font-medium" : mediumFont ? "text-base" : "text-xs "
              } ${matches ? "font-medium" : ""}`,
              startAdornment:
                matches && dates[0] ? (
                  <IconGenerator
                    alt="Calendar icon"
                    src={"/calendar_icon.svg"}
                    className={
                      bigFont
                        ? "mr-3 w-4 sm:w-8"
                        : mediumFont
                        ? "mr-2 w-5"
                        : "mr-2 w-4"
                    }
                  />
                ) : null,
            },
          },
        }}
        value={dates}
        onChange={handleDateChange}
        localeText={{ start: "Check-in", end: "Check-out" }}
      />
    </LocalizationProvider>
  );
};

export default RangeDatePicker;