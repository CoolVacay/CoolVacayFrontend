"use client";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconGenerator } from "../IconGenerator";
import type { DateRangeType } from "../../home/SearchCard";
import type { Dayjs } from "dayjs";

const RangeDatePicker = ({
  size,
  dates,
  setDates,
}: {
  size: "small" | "medium" | "big";
  dates: DateRangeType;
  setDates: React.Dispatch<React.SetStateAction<DateRangeType>>;
}) => {
  const bigFont = size === "big";
  const mediumFont = size === "medium";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        components={["DateRangePicker"]}
      >
        <DateRangePicker
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
          slotProps={{
            fieldSeparator: {
              sx: {
                backgroundColor: "#EAEAEF",
                color: "transparent",
                width: "1px",
                height: bigFont || mediumFont ? "62px" : "42px",
                position: "absolute",
                left: bigFont ? "190px" : mediumFont ? "175px" : "122px",
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
          onChange={(newValue) => {
            setDates(newValue as [Dayjs, Dayjs]);
          }}
          localeText={{ start: "Check-in", end: "Check-out" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default RangeDatePicker;
