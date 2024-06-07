"use client";

import { useFormStatus } from "react-dom";

export default function ActionButton({
  disabled,
  text,
}: {
  disabled: boolean;
  text: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white disabled:opacity-50"
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
    >
      {text}
    </button>
  );
}
