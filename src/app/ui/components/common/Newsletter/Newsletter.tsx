"use client";

import Image from "next/image";
import { registerFollower } from "~/app/(application)/actions";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useFormState } from "react-dom";
import { ActionButton } from "../../authentication";

export default function Newsletter() {
  const [errorMessage, dispatch] = useFormState(registerFollower, undefined);
  const ValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Subscribing user"),
  });
  return (
    <form
      action={() => {
        dispatch(formik.values);
      }}
    >
      <div className="relative flex w-full shrink-0 rounded-xl">
        <div className="flex h-[250px] w-full shrink-0">
          <Image
            alt="Coolvacay about us, second image"
            src="/newsletter_img.jpeg"
            className="rounded-xl"
            quality={20}
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
            style={{
              objectFit: "cover",
              height: "250px",
              width: "100%",
              filter: "brightness(60%)",
            }}
          />
        </div>
        <div className="absolute left-2/4 top-2/4 w-full -translate-x-2/4 -translate-y-2/4 text-white">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <h1 className="text-[48px] leading-[57px]">
              Stay up-to-date on our deals.
            </h1>
            <h5 className="text-md">
              Curated tips, inspiration, and discounts for your next vacation.
            </h5>
            <div className="flex gap-4">
              <input
                id="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                className="focus:shadow-outline w-[285px] appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <ActionButton
                text="Go"
                disabled={!formik.isValid || !formik.dirty}
                borderRadius="rounded"
                className="rounded-lg bg-primary px-8 py-2 disabled:bg-gray-500"
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
