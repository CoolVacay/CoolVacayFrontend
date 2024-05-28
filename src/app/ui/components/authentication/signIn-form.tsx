"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "~/app/(authentication)/signin/actions";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../PasswordInput/PasswordInput";

export type LoginValue = {
  email: string;
  password: string;
};

const ValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email field is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password field is required"),
});

export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Validating credentials"),
  });

  return (
    <form action={dispatch} className="flex flex-col gap-8">
      <div>
        <label htmlFor="email" className="mb-1 block text-lg font-medium">
          Email Address
        </label>
        <TextField
          fullWidth
          color="primary"
          placeholder="Email Address"
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          sx={{ borderRadius: "50px" }}
          InputProps={{
            style: {
              borderRadius: "50px",
            },
          }}
          helperText={formik.touched.email && formik.errors.email}
          FormHelperTextProps={{
            style: {
              fontSize: "14px",
            },
          }}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-lg font-medium">
          Password
        </label>
        <PasswordInput
          name="password"
          placeholder="Password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex items-center justify-between py-[14px]">
          {/* TODO:what will the remember me do ? */}
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              className="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="default-checkbox"
              className="font-500 ms-2 text-sm font-medium"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/forgotten-password"
            className="hover:text-primary-dark cursor-pointer text-sm font-medium tracking-wider text-primary-grey300"
          >
            Forgot your password?
          </Link>
        </div>
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <LoginButton disabled={!formik.isValid || !formik.dirty} />
    </form>
  );
}

function LoginButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white disabled:opacity-50"
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
    >
      Sign In
    </button>
  );
}
