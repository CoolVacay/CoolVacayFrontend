"use client";

import { useFormStatus } from "react-dom";

export default function ActionButton({
  disabled,
  text,
  type,
  borderRadius = "rounded",
}: {
  disabled: boolean;
  text: string;
  type?: "small" | "big";
  borderRadius?: "rectangle" | "rounded";
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`h-${type === "small" ? "12" : "15"} ${borderRadius === "rounded" ? "rounded-[100px]" : "rounded-[8px]"} flex w-full items-center justify-center bg-primary p-4 text-white disabled:opacity-50`}
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
    >
      {text}
    </button>
  );
}
