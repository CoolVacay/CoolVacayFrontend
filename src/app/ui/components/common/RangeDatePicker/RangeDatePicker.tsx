"use client";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { IconGenerator } from "../IconGenerator";
import type { DateRangeType } from "../../home/SearchCard";
import type { Dayjs } from "dayjs";
import StyledDatePicker from "./StyledDatePicker";

const RangeDatePicker = ({
  size,
  dates,
  setDates,
}: {
  size: "small" | "medium" | "big";
  dates: DateRangeType;
  setDates:
    | React.Dispatch<React.SetStateAction<DateRangeType>>
    | ((values: DateRangeType) => void);
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
            sx: {
              backgroundColor: "#EAEAEF",
              color: "transparent",
              width: "1px",
              height: bigFont || mediumFont ? "62px" : "42px",
              position: "absolute",
              left: bigFont ? "198px" : mediumFont ? "175px" : "122px",
              top: bigFont ? "20px" : mediumFont ? "12px" : "10px",
            },
          },
          textField: {
            variant: "standard",
            InputLabelProps: {
              className: `${bigFont ? "text-2xl -top-3" : mediumFont ? "text-xl -top-2" : "text-base -top-1"} font-medium absolute`,
            },
            InputProps: {
              sx: {
                fontSize: bigFont ? "20px" : mediumFont ? "16px" : "12px",
                fontWeight: 500,
              },
              startAdornment: (
                <IconGenerator
                  alt="Calendar icon"
                  src={`/calendar_icon.svg`}
                  width={bigFont ? "32px" : mediumFont ? "21px" : "16px"}
                  className={bigFont ? "mr-3" : "mr-2"}
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
