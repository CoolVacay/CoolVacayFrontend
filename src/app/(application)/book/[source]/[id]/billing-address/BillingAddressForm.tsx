"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authenticateCR } from "~/app/(authentication)/actions";
import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput } from "~/app/ui/components/common";

const ValidationSchema = Yup.object({
  street: Yup.string().required("Street field is required"),
  aptNr: Yup.string().required("Apt Number field is required"),
  city: Yup.string().required("City field is required"),
  state: Yup.string().required("State field is required"),
  zip: Yup.string().required("Zip field is required"),
  country: Yup.string().required("Country field is required"),
});

export default function BillingAddressForm() {
  const [errorMessage, dispatch] = useFormState(authenticateCR, undefined);

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
      <form action={dispatch} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="street" className="mb-1 block text-lg font-medium">
              Street Address
            </label>
            <SimpleInput
              placeholder="Street Address"
              name="street"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              variant="rounded"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="aptNr" className="mb-1 block text-lg font-medium">
                Apt or Suite Number
              </label>
              <SimpleInput
                name="aptNr"
                placeholder="Apt or Suite Number"
                error={formik.touched.aptNr && Boolean(formik.errors.aptNr)}
                // helperText={formik.touched.aptNr && formik.errors.aptNr}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                //   helperText={formik.touched.state && formik.errors.state}
              />
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
                //   helperText={formik.touched.zip && formik.errors.zip}
                variant="rounded"
              />
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
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              //   helperText={formik.touched.country && formik.errors.country}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
        <ActionButton disabled={!formik.isValid || !formik.dirty} text="Next" />
      </form>
    </>
  );
}
