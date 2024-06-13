import React, { type FocusEvent } from "react";
import { Input } from "@mui/base";

interface FormikTextFieldProps {
  name: string;
  placeholder?: string;
  onBlur?: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  type?: string;
  disabled?: boolean;
  defaultValue?: string;
}
export default function SimpleInput({
  name,
  placeholder,
  onBlur,
  onChange,
  error,
  disabled = false,
  defaultValue,
  type = "text",
}: FormikTextFieldProps) {
  return (
    <Input
      color="primary"
      placeholder={placeholder}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      type={type}
      disabled={disabled}
      defaultValue={defaultValue}
      slotProps={{
        input: {
          className:
            "block w-full rounded-lg bg-white p-2.5 text-sm text-[#676D73] focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73]",
        },
      }}
    />
  );
}
