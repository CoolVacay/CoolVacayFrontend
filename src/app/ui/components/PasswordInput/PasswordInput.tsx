"use client";

import React, { type FocusEvent, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";

const PasswordInput = ({
  name,
  placeholder,
  error,
  onChange,
  onBlur,
  helperText,
}: {
  name: string;
  placeholder: string;
  error: boolean | undefined;
  helperText: React.ReactNode;
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
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      onChange={onChange}
      sx={{
        borderRadius: "50px",
      }}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
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
      FormHelperTextProps={{
        style: {
          fontSize: "14px",
        },
      }}
      onBlur={onBlur}
    />
  );
};

export default PasswordInput;
