"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ActionButton } from "../authentication/common";
import type { ListingData } from "~/app/(application)/definitions";
import { SimpleInput } from "../common";
import { inquire } from "~/app/(application)/actions";
import type { IInquireArgs } from "~/app/(application)/actions";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  phone: Yup.string()
    .min(8, "Enter a valid phone number")
    .required("This field is required"),
  message: Yup.string()
    .max(240, "Message is too long")
    .required("This field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
});

export default function InquireForm({
  listing,
  setOpen,
}: {
  listing?: ListingData;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [errorMessage, dispatch] = useFormState(inquire, undefined);

  const formik = useFormik({
    initialValues: listing
      ? {
          id: listing.id,
          name: "",
          email: "",
          phone: "",
          message: "",
          source: listing.source,
        }
      : {
          name: "",
          email: "",
          phone: "",
          message: "",
        },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Submitting Message"),
  });
  return (
    <form
      action={() => {
        dispatch(formik.values as IInquireArgs);
        if (setOpen) {
          setOpen(false);
        }
      }}
    >
      <div className="flex flex-col gap-5">
        {listing ? (
          <div>
            <SimpleInput
              name="id"
              disabled={true}
              defaultValue={`Property ID: ${listing.id}`}
            />
          </div>
        ) : null}
        <div>
          <SimpleInput
            name="name"
            placeholder="Name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.name && Boolean(formik.errors.name) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <SimpleInput
            name="email"
            placeholder="Email Address"
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <SimpleInput
            name="phone"
            placeholder="Phone number"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && Boolean(formik.errors.phone) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>
        <div>
          <textarea
            rows={4}
            name="message"
            placeholder="Message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="text block w-full rounded-lg bg-white p-2.5 text-[#676D73] focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73]"
          />
          {formik.touched.message && Boolean(formik.errors.message) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.message}</p>
          )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {listing ? (
          <h6 className="text-justify text-sm font-normal	text-[#858C93]">
            By proceeding, you consent to receive calls and texts at the number
            you provided, including marketing by autodialer and prerecorded and
            artificial voice, and email, from realtor.com and about your inquiry
            and other home-related matters, but not as a condition of any
            purchase. You also agree to our Terms of Use, and to our Privacy
            Policy regarding the information relating to you. Msg/data rates may
            apply. This consent applies even if you are on a corporate, state or
            national Do Not Call list.
          </h6>
        ) : null}
        <ActionButton
          text={listing ? "Inquire now" : "Submit"}
          disabled={!formik.isValid || !formik.dirty}
          borderRadius={listing ? "rounded" : "rectangle"}
        />
      </div>
    </form>
  );
}
