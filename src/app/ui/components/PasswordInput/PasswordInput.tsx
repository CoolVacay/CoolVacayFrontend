"use client";
import React, { Dispatch, FocusEvent, SetStateAction, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";

const PasswordInput = ({
  name,
  label,
  error,
  value,
  onChange,
  onBlur,
}: {
  name: string;
  label: string;
  error: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      sx={{
        borderRadius: "50px",
      }}
      FormHelperTextProps={{
        color: "red",
      }}
      helperText={error ? "Password is required" : ""}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              value={value}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        style: {
          borderRadius: "50px",
        },
      }}
      onBlur={onBlur}
    />
  );
};

export default PasswordInput;
