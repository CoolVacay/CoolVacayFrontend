import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  label?: string;
  value: string | number | number[] | boolean;
  regex?: RegExp;
  isWrongFormat?: boolean;
  country?: string | undefined;
  userId?: string | number;
  placeholder?: string;
  editable?: boolean;
  isMultiline?: boolean;
  onChangeValue?: (value: string) => void;
  className?: string;
};

const ToggleInput: React.FC<Props> = ({
  label,
  country,
  userId,
  value,
  regex,
  isWrongFormat,
  editable,
  placeholder,
  isMultiline,
  onChangeValue,
  className,
}) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (regex) {
      const val = e.target.value;
      if (val !== "" && !regex?.test(val)) {
        return;
      }
      onChangeValue?.(val);
    } else {
      onChangeValue?.(e.target.value);
    }
  };

  return (
    <div
      className={`
        ${className},
        "mb-2 bg-opacity-10", ${
          editable ? "flex-col" : ""
        } flex gap-1.5 bg-slate-200
      `}
    >
      {editable ? (
        <TextField
          id="filled-input"
          label={label}
          value={value || ""}
          multiline={isMultiline}
          rows={isMultiline ? 4 : 1}
          placeholder={placeholder}
          onChange={handleChangeInput}
          className={`w-full truncate rounded-xl text-left ${
            !isWrongFormat ? "bg-greyscale-greyishWhite" : "bg-errorscale-light"
          }`}
          sx={{
            "& label": {
              left: "0.7rem",
              top: "0.3rem",
              color: "#A0A3BD",
            },
            "& .MuiInputBase-multiline": {
              left: "0.7rem",
              top: "0.3rem",
            },
          }}
          InputProps={{
            disableUnderline: true,
            className: !label ? "p-3" : "p-1",
          }}
          variant="standard"
        />
      ) : (
        <TextField
          label={label}
          value={value || ""}
          multiline={isMultiline}
          rows={isMultiline ? 5 : 1}
          className="bg-greyscale-offWhite w-full truncate rounded-xl text-left"
          sx={{
            "& label": {
              left: "0.7rem",
              top: "0.3rem",
              color: "#A0A3BD !important",
            },
            "& label.Mui-focused": {
              color: "#A0A3BD !important",
            },
            "& .MuiInputBase-multiline": {
              left: "0.2rem",
              top: "0.3rem",
            },
          }}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            className: "p-1",
          }}
          variant="standard"
        />
      )}
    </div>
  );
};

export default ToggleInput;
