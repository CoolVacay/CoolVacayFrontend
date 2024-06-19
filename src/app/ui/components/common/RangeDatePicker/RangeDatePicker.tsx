"use client";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IconGenerator } from "../IconGenerator";

const RangeDatePicker = ({ size }: { size: "small" | "big" }) => {
  const bigFont = size === "big";
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
                height: "62px",
                position: "absolute",
                left: bigFont ? "190px" : "155px",
                top: bigFont ? "20px" : "12px",
              },
            },
            textField: {
              variant: "standard",
              InputLabelProps: {
                className: `${bigFont ? "text-2xl -top-3" : "text-xl -top-2"} font-medium absolute`,
              },
              InputProps: {
                sx: { fontSize: bigFont ? "20px" : "16px", fontWeight: 500 },
                startAdornment: (
                  <IconGenerator
                    alt="Calendar icon"
                    src={`/calendar_icon.svg`}
                    width={bigFont ? "32px" : "21px"}
                    className={bigFont ? "mr-3" : "mr-2"}
                  />
                ),
              },
            },
          }}
          defaultValue={[dayjs(), dayjs().add(6, "day")]}
          localeText={{ start: "Check-in", end: "Check-out" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default RangeDatePicker;