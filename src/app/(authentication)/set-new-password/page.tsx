"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useFormik } from "formik";
import { ActionButton } from "~/app/ui/components/authentication";
import { FormikTextField } from "~/app/ui/components/common";
import { setNewPassword } from "../actions";
import Link from "next/link";
import { PasswordCheckSchema } from "../schemas";

function SetNewPassword() {
  const [errorMessage, dispatch] = useFormState(setNewPassword, undefined);

  let userEmail = "";
  let otpCode = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage.getItem("regEmail") ?? "";
    otpCode = localStorage.getItem("otpCode") ?? "";
  }

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      code: otpCode,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: PasswordCheckSchema,
    onSubmit: () => console.log("Updating password"),
  });

  return (
    <div className="flex flex-col gap-20">
      <Link href="/" className="w-[200px]">
        <Image
          src="/cool_vacay_logo_blue.svg"
          alt="CoolVacay Logo"
          width={200}
          height={22}
          className="gap-10"
        />
      </Link>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Set a new password</h1>
          <p className="text-[#9FA4AA]">
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <div>
          <form
            action={() => {
              //eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { confirmPassword, ...rest } = formik.values;
              dispatch(rest);
            }}
            className="flex flex-col gap-8"
          >
            <div>
              <label htmlFor="email" className="mb-1 block text-lg font-medium">
                New Password
              </label>
              <FormikTextField
                placeholder="New Password"
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-lg font-medium">
                Confirm Password
              </label>
              <FormikTextField
                placeholder="Confirm Password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
            <ActionButton
              disabled={!formik.isValid || !formik.dirty}
              text="Save New Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
