"use client";

import Image from "next/image";
import React, { useState } from "react";
import PasswordInput from "../../ui/components/PasswordInput/PasswordInput";
import {
  Formik,
  Form,
  type FormikHelpers,
  type FormikTouched,
  type FormikErrors,
} from "formik";
import TextField from "@mui/material/TextField";
import Loader from "../../ui/components/common/Loader/loader";
import * as Yup from "yup";
import { Button } from "@mui/base";
import Link from "next/link";

export type LoginValue = {
  email: string;
  password: string;
};

const initialValues: LoginValue = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().required(),
});

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const displayError = (
    touched: FormikTouched<LoginValue>,
    error: FormikErrors<LoginValue>,
  ) => {
    let message = "";

    if (touched.email && error.email) message = error.email;
    if (touched.password && error.password) message = error.password;
    if (touched.email && error.email && touched.password && error.password)
      message = "Please enter valid email and password";

    return message;
  };
  const handleSubmit = async (
    values: LoginValue,
    { setSubmitting }: FormikHelpers<LoginValue>,
  ) => {
    setLoading(true);
    setSubmitting(true);
    try {
      const resp = await fetch("http://localhost:5076/api/auth/access-token", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      console.log(resp);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loader />
      </div>
    );
  //TODO:refactor login page
  return (
    <div className="flex flex-col gap-20">
      <Image
        src="/cool_vacay_logo_blue.svg"
        alt="CoolVacay Logo"
        width={200}
        height={22}
        className="gap-10"
      />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Sign in</h1>
          <p className="text-[#9FA4AA]">
            Be ready to unlock exclusive features only with Coolvacay
          </p>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              isValid,
              isSubmitting,
            }) => {
              return (
                <Form className="flex flex-col gap-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-lg font-medium"
                    >
                      Email Address
                    </label>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      error={touched.email && !!errors.email}
                      value={values.email}
                      InputProps={{
                        style: {
                          borderRadius: "50px",
                        },
                      }}
                      FormHelperTextProps={{
                        color: "red",
                      }}
                      helperText={
                        errors.email && touched.email
                          ? "Email is required and must be formatted correctly"
                          : ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setError("");
                      }}
                      id="outlined-start-adornment"
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-lg font-medium"
                    >
                      Password
                    </label>
                    <PasswordInput
                      label="Password"
                      name="password"
                      error={!!touched.password && !!errors.password}
                      value={values.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setError("");
                      }}
                      onBlur={handleBlur}
                    />
                    {error && (
                      <div className="text-errorscale-dark mb-3 mr-2 text-xs font-semibold">
                        {error || displayError(touched, errors)}
                      </div>
                    )}
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="h-4 w-4 form-checkbox rounded border-gray-300 text-primary focus:ring-primary"
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
                  </div>
                  <Button
                    className={`h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white disabled:opacity-50`}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    Log in
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Don’t have an account?
          <Link className="ml-2 text-primary" href={"/authentication/signup"}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
