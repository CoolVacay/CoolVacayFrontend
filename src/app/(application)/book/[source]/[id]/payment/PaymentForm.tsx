"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput } from "~/app/ui/components/common";
import Link from "next/link";
import { useState } from "react";
import BookingCompleted from "./BookingCompleted";

const ValidationSchema = Yup.object({
  cardNumber: Yup.string().required("This field is required"),
  expiryDate: Yup.string().required("This field is required"),
  cvv: Yup.string().required("This field is required"),
});

export default function PaymentForm({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => setPaymentCompleted(true),
  });
  //TODO: refactor
  return paymentCompleted ? (
    <BookingCompleted />
  ) : (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="street" className="mb-1 block text-lg font-medium">
            Card Number<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="Card Number"
            name="cardNumber"
            required={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            variant="rounded"
          />
          {formik.touched.cardNumber && Boolean(formik.errors.cardNumber) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.touched.cardNumber && formik.errors.cardNumber}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="state" className="mb-1 block text-lg font-medium">
              Expiration Date<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="Expiration Date"
              name="expiryDate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              variant="rounded"
            />
            {formik.touched.expiryDate && Boolean(formik.errors.expiryDate) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.expiryDate && formik.errors.expiryDate}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="zip" className="mb-1 block text-lg font-medium">
              CVV<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="CVV"
              name="cvv"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              variant="rounded"
            />
            {formik.touched.cvv && Boolean(formik.errors.cvv) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.cvv && formik.errors.cvv}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-28 flex gap-4">
        <Link
          href={`/book/${params.source}/${params.id}/billing-address`}
          className="flex h-12 w-full items-center justify-center rounded-[100px] border border-[#ADB5BD] bg-white p-4 text-black hover:bg-black hover:text-white"
        >
          Back
        </Link>
        {/* <Link
          href={
            paymentCompleted
              ? {}
              : `/book/${params.source}/${params.id}/payment`
          }
          className="h-12 w-full"
        > */}
        <ActionButton
          disabled={!formik.isValid || !formik.dirty}
          text="Book now"
          type="small"
        />
        {/* </Link> */}
      </div>
    </form>
  );
}
