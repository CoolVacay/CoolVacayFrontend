"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerFollower } from "~/app/(application)/actions";
import { ActionButton } from "../../authentication";
import { toastNotifier } from "~/app/utils/helpers";
import { Toaster } from "react-hot-toast";

export default function NewsletterForm({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
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
  const horizontalOrientation = orientation === "horizontal";
  return (
    <form
      action={() => {
        dispatch(formik.values);
        formik.resetForm();
        toastNotifier(errorMessage);
      }}
    >
      <div
        className={
          horizontalOrientation
            ? `absolute left-2/4 top-2/4 w-full -translate-x-2/4 -translate-y-2/4 text-white`
            : "flex w-full flex-col"
        }
      >
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1
            className={
              horizontalOrientation
                ? `text-[48px] leading-[57px]`
                : `text-2xl font-medium`
            }
          >
            Stay up-to-date on our deals.
          </h1>
          <h5 className={horizontalOrientation ? "text-md" : "text-[#676D73]"}>
            Curated tips, inspiration, and discounts for your next vacation.
          </h5>
          <div
            className={
              horizontalOrientation ? "flex gap-4" : "flex flex-col gap-4"
            }
          >
            <input
              id="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className={`focus:shadow-outline ${horizontalOrientation ? "w-[285px]" : "w-[260px] text-sm"} appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            />
            <ActionButton
              text={horizontalOrientation ? "Go" : "Subscribe now"}
              disabled={!formik.isValid || !formik.dirty}
              borderRadius="rounded"
              className={
                horizontalOrientation
                  ? "rounded-lg bg-primary px-8 py-2 disabled:bg-gray-500"
                  : "w-[260px] rounded-[8px] bg-primary px-2 py-2 text-sm text-white"
              }
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
      <Toaster />
    </form>
  );
}
