"use client";

import { FormControl, Box, Autocomplete, TextField } from "@mui/material";
import { IconGenerator } from "../IconGenerator";
import type { ILocationsList } from "~/app/(application)/actions";
import type {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";

export interface CustomHTMLAttributes
  extends React.HTMLAttributes<HTMLLIElement> {
  key?: React.Key;
}

export default function CitiesAutocomplete({
  locationsList,
  isSmallSize,
  onChange,
  inputValue,
  value,
  setValue,
  variant,
}: {
  locationsList: readonly ILocationsList[];
  isSmallSize?: boolean;
  variant: "white" | "blue";
  inputValue: string;
  value: ILocationsList | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (
    event: React.SyntheticEvent,
    value: ILocationsList | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ILocationsList> | undefined,
  ) => void | undefined;
}) {
  const whiteVariant = variant === "white";

  return (
    <FormControl fullWidth={whiteVariant}>
      <Autocomplete
        id="location-select"
        options={locationsList}
        autoHighlight
        popupIcon={
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            width={!isSmallSize ? "32px" : "18px"}
            className={!whiteVariant ? "mr-2" : ""}
          />
        }
        getOptionLabel={(option) => option.displayName}
        inputValue={inputValue}
        onChange={onChange}
        value={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        renderOption={(props: CustomHTMLAttributes, option: ILocationsList) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <IconGenerator
                width={whiteVariant ? "20px" : "16px"}
                src="/location-pin.svg"
                alt={option.displayName}
              />
              {option.displayName}
            </Box>
          );
        }}
        ListboxProps={{
          sx: {
            fontSize: whiteVariant ? "16px" : "14px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={whiteVariant ? "Location" : null}
            variant="standard"
            placeholder="Select Location"
            inputProps={{
              ...params.inputProps,
            }}
            InputLabelProps={{
              className: whiteVariant
                ? `block ${isSmallSize ? "text" : "text-2xl"} font-medium`
                : ``,
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                padding:
                  isSmallSize && !whiteVariant
                    ? "0px 50px"
                    : isSmallSize && whiteVariant
                      ? "0px"
                      : "14px 65px 14px 0px !important",
                fontSize: isSmallSize ? "12px" : "20px",
                fontWeight: whiteVariant ? 500 : 400,
              },
              className: whiteVariant
                ? ""
                : "pl-3 bg-[#EAF7FD] text-[#212529] h-9 text-sm rounded-full border border-[#EAEAEF]",
              startAdornment: (
                <IconGenerator
                  alt="Location Icon"
                  src="/location-pin.svg"
                  width={isSmallSize ? "16px" : "28px"}
                  className={`${isSmallSize ? "right-[2px]" : "left-0 top-3"} mr-2`}
                />
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
