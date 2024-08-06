"use client";

import { styled } from "@mui/material";
import {
  DateRangePickerDay,
  type DateRangePickerDayProps,
} from "@mui/x-date-pickers-pro/DateRangePickerDay";
import dayjs from "dayjs";

import type { Dayjs } from "dayjs";

const StyledDatePicker = styled(DateRangePickerDay)(
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
  }) => {
    const today = dayjs();
    const isDisabled = day.isBefore(today, "day");

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
                    : theme.palette.action.selected,
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
                }
              : {}),
            ...(isEndOfHighlighting || isEndOfPreviewing
              ? {
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                }
              : {}),
            ...(isDisabled && {
              color: theme.palette.text.disabled,
              pointerEvents: "none",
            }),
          }),
    };
  },
) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;

export default StyledDatePicker;
