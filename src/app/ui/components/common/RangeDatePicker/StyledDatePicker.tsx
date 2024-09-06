"use client";

import { styled } from "@mui/material";
import {
  DateRangePickerDay,
  type DateRangePickerDayProps,
} from "@mui/x-date-pickers-pro/DateRangePickerDay";
import isBetween from "dayjs/plugin/isBetween";
import dayjs, { type Dayjs } from "dayjs";
import type { DateRangeType } from "../../home/SearchCard";

dayjs.extend(isBetween);

interface CustomDateRangePickerDayProps extends DateRangePickerDayProps<Dayjs> {
  availableDates?: string[];
  rangeDatesAvailable?: string[];
  selectedDates?: DateRangeType;
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
    disabled,
    isPreviewing,
    isStartOfPreviewing,
    isEndOfPreviewing,
    day,
    availableDates,
    rangeDatesAvailable,
    selectedDates,
  }) => {
    const findAvailableDate = () => {
      if (rangeDatesAvailable && !selectedDates?.[1]) {
        const isBetweenDay = day.isBetween(
          selectedDates?.[0],
          dayjs(rangeDatesAvailable.at(0)),
          "day",
          "[)",
        );
        return isBetweenDay
          ? "betweenDay"
          : rangeDatesAvailable.find((item) => dayjs(item).isSame(day, "day"))
            ? true
            : false;
      }
      if (availableDates) {
        const item = availableDates.find((item) =>
          dayjs(item).isSame(day, "day"),
        );
        return item ? true : false;
      }
      return !disabled;
    };
    const isAvailable = findAvailableDate();
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
            ...(isAvailable === "betweenDay"
              ? {
                  position: "relative",
                  color: theme.palette.text.disabled,
                  pointerEvents: "none",
                }
              : {}),
            ...(typeof isAvailable === "boolean" &&
              !isAvailable &&
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              (disabled || !isAvailable) && {
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
