"use client";

import Image from "next/image";
import React, { useState } from "react";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import {
  Formik,
  Form,
  type FormikHelpers,
  type FormikTouched,
  type FormikErrors,
} from "formik";
import TextField from "@mui/material/TextField";
import Loader from "../../components/common/Loader/loader";
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

  return (
    <div className="flex w-full flex-col gap-5">
      <Image
        src="/coolVacayLogo.svg"
        alt="CoolVacay Logo"
        width={200}
        height={22}
      />

      <div>
        <h1 className="text-3xl">Sign in or Create an account</h1>
        <p className="text-[#9FA4AA]">
          {"Be ready to unlock exclusive features only with Coolvacay"}
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
              <Form className="flex flex-col gap-5">
                <TextField
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
                <div className="flex">
                  {error && (
                    <div className="text-errorscale-dark mb-3 mr-2 text-xs font-semibold">
                      {error || displayError(touched, errors)}
                    </div>
                  )}
                  <Link
                    href={"/authentication/forgotten-password"}
                    className="hover:text-primary-dark mb-3 cursor-pointer text-xs font-medium tracking-wider text-primary"
                  >
                    Forgot your password?
                  </Link>
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
  );
}

export default SignIn;
