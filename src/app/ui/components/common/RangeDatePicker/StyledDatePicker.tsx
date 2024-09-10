"use client";

import { styled } from "@mui/material";
import {
  DateRangePickerDay,
  type DateRangePickerDayProps,
} from "@mui/x-date-pickers-pro/DateRangePickerDay";
import dayjs from "dayjs";

import type { Dayjs } from "dayjs";
import type { IPropertyAvailability } from "~/app/(application)/definitions";

interface CustomDateRangePickerDayProps extends DateRangePickerDayProps<Dayjs> {
  availableDates?: string[];
}

const StyledDatePicker = styled(DateRangePickerDay, {
  shouldForwardProp: (prop) => prop !== "availableDates",
})<CustomDateRangePickerDayProps>(
  ({
    theme,
    isHighlighting,
    isStartOfHighlighting,
    isEndOfHighlighting,
    outsideCurrentMonth,
    isPreviewing,
    isStartOfPreviewing,
    isEndOfPreviewing,
    day,
    availableDates,
  }) => {
    const today = dayjs();
    const isDisabled = day.isBefore(today, "day");
    const isAvailable:boolean = availableDates
      ? !!availableDates.find((item) =>
          dayjs(item).isSame(day, "day"),
        )
      : false;
    return {
      ...(outsideCurrentMonth
        ? {
            //Removing the styles for outside of days range
          }
        : {
            "&:hover, &:focus": {
              backgroundColor: theme.palette.action.hover,
            },
            ...(isHighlighting || isPreviewing
              ? {
                  borderRadius: 0,
                  backgroundColor: isHighlighting
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
                  color: theme.palette.common.white,
                  "&:hover, &:focus": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }
              : {}),
            ...(isStartOfHighlighting || isStartOfPreviewing
              ? {
                  borderTopLeftRadius: "50%",
                  borderBottomLeftRadius: "50%",
                  backgroundColor: theme.palette.primary.dark,
                }
              : {}),
            ...(isEndOfHighlighting || isEndOfPreviewing
              ? {
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                  backgroundColor: theme.palette.primary.dark,
                }
              : {}),
            ...((isDisabled || !isAvailable) && {
              position: "relative",
              color: theme.palette.text.disabled,
              pointerEvents: "none",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "70%",
                height: "2px",
                backgroundColor: theme.palette.text.disabled,
                transform: "translate(-50%, -50%) rotate(-45deg)",
              },
            }),
          }),
    };
  },
) as React.ComponentType<CustomDateRangePickerDayProps>;

export default StyledDatePicker;
