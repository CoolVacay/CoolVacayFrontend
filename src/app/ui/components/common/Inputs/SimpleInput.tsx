"use client";

import { Input } from "@mui/base";

interface SimpleInputProps {
  name: string;
  placeholder?: string;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  type?: string;
  disabled?: boolean;
  defaultValue?: string;
  styles?: string;
  variant?: "rectangle" | "rounded";
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
  styles,
  variant = "rectangle",
}: SimpleInputProps) {
  const isRectangleVariant = variant === "rectangle";
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
          className: `block w-full rounded-${isRectangleVariant ? "lg" : "full"} bg-white p-${isRectangleVariant ? "2.5" : "4"} text-[#676D73] focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73] ${styles} ${isRectangleVariant ? "" : "border border-[#EAEAEF]"}`,
        },
      }}
    />
  );
}
