"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput } from "~/app/ui/components/common";
import Link from "next/link";

const ValidationSchema = Yup.object({
  street: Yup.string().required("Street field is required"),
  city: Yup.string().required("City field is required"),
  state: Yup.string().required("State field is required"),
  zip: Yup.string().required("Zip field is required"),
  country: Yup.string().required("Country field is required"),
});

export default function BillingAddressForm({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const formik = useFormik({
    initialValues: {
      street: "",
      aptNr: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Submitting form"),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <label htmlFor="street" className="mb-1 block text-lg font-medium">
              Street Address<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="Street Address"
              name="street"
              required={true}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              variant="rounded"
            />
            {formik.touched.street && Boolean(formik.errors.street) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.street && formik.errors.street}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="aptNr" className="mb-1 block text-lg font-medium">
                Apt or Suite Number
              </label>
              <SimpleInput
                name="aptNr"
                placeholder="Apt or Suite Number"
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                variant="rounded"
              />
            </div>
            <div className="w-full">
              <label htmlFor="city" className="mb-1 block text-lg font-medium">
                City
              </label>
              <SimpleInput
                placeholder="City"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                variant="rounded"
                //   helperText={formik.touched.city && formik.errors.city}
              />
              {formik.touched.city && Boolean(formik.errors.city) && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.touched.city && formik.errors.city}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="state" className="mb-1 block text-lg font-medium">
                State
              </label>
              <SimpleInput
                placeholder="State"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                variant="rounded"
              />
              {formik.touched.state && Boolean(formik.errors.state) && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.touched.state && formik.errors.state}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="zip" className="mb-1 block text-lg font-medium">
                ZIP Code
              </label>
              <SimpleInput
                placeholder="ZIP Code"
                name="zip"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.zip && Boolean(formik.errors.zip)}
                variant="rounded"
              />
              {formik.touched.zip && Boolean(formik.errors.zip) && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.touched.zip && formik.errors.zip}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="country" className="mb-1 block text-lg font-medium">
              Country
            </label>
            <SimpleInput
              placeholder="Country"
              name="country"
              variant="rounded"
              onBlur={formik.handleBlur}
              defaultValue={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
            />
            {formik.touched.country && Boolean(formik.errors.country) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.country && formik.errors.country}
              </p>
            )}
          </div>
        </div>
        <Link href={`/book/${params.source}/${params.id}/payment`}>
          <ActionButton
            disabled={!formik.isValid || !formik.dirty}
            text="Next"
          />
        </Link>
      </form>
    </>
  );
}
