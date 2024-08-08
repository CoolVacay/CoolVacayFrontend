"use client";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { IconGenerator } from "../IconGenerator";
import type { DateRangeType } from "../../home/SearchCard";
import type { Dayjs } from "dayjs";
import StyledDatePicker from "./StyledDatePicker";
import type { IPropertyAvailability } from "~/app/(application)/definitions";
const RangeDatePicker = ({
  size,
  dates,
  setDates,
  availableDates,
}: {
  size: "small" | "medium" | "big";
  dates: DateRangeType;
  setDates:
    | React.Dispatch<React.SetStateAction<DateRangeType>>
    | ((values: DateRangeType) => void);
  availableDates?: IPropertyAvailability;
}) => {
  const bigFont = size === "big";
  const mediumFont = size === "medium";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
        slots={{ day: StyledDatePicker }}
        format="MMM DD, YYYY"
        slotProps={{
          fieldSeparator: {
            sx: { color: "transparent" },
            className: `${bigFont || mediumFont ? "sm:h-16 h-14" : "h-11"} w-[1px] absolute bg-primary-grey100 ${bigFont ? "sm:left-[198px] sm:top-5 top-3 left-[150px]" : mediumFont ? "left-44 top-3" : "left-[122px] top-10px"}`,
          },
          day: {
            // @ts-expect-error MUI doesnt recognize forwardProp
            availableDates: availableDates,
          },
          textField: {
            variant: "standard",
            InputLabelProps: {
              className: `${bigFont ? "sm:text-2xl text-xl sm:-top-3 -top-2" : mediumFont ? "text-xl -top-2" : "text-base -top-1"} font-medium absolute`,
            },
            InputProps: {
              className: `${bigFont ? "sm:text-xl text-sm" : mediumFont ? "text-base" : "text-xs"} font-medium`,
              startAdornment: (
                <IconGenerator
                  alt="Calendar icon"
                  src={`/calendar_icon.svg`}
                  className={
                    bigFont
                      ? "mr-1 mr-3 w-4 sm:w-8"
                      : mediumFont
                        ? "mr-2 w-5"
                        : "mr-2 w-4"
                  }
                />
              ),
            },
          },
        }}
        value={dates}
        onAccept={(newValue) => {
          setDates(newValue as [Dayjs, Dayjs]);
        }}
        localeText={{ start: "Check-in", end: "Check-out" }}
      />
    </LocalizationProvider>
  );
};

export default RangeDatePicker;
