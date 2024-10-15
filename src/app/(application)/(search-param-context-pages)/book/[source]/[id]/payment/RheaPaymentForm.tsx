"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

import { removeEmptyValues, toastNotifier } from "~/app/utils/helpers";
import { bookingPayment } from "~/app/(application)/actions";
import type { IBookingPaymentArgs } from "~/app/(application)/definitions";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { useFormContext } from "../FormContext";
import { userIdSchema, missingUserIdSchema } from "./validationSchemas";
import { useRouter } from "next/navigation";

interface RheaPaymentFormProps {
  userId?: string;
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    numberOfGuests: string;
    fromDate: string;
    toDate: string;
  };
}

export default function RheaPaymentForm({
  userId,
  params,
  searchParams,
}: RheaPaymentFormProps) {
  const { searchParamsValues } = useAppSearchParams();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const router = useRouter();
  const { formData } = useFormContext();

  const formik = useFormik({
    initialValues: userId
      ? {
          userId: Number(userId),
          listingId: params.id,
          source: params.source,
          fromDate: searchParamsValues.fromDate?.format("YYYY-MM-DD"),
          toDate: searchParamsValues.toDate?.format("YYYY-MM-DD"),
          adults: Number(searchParamsValues.numberOfGuests),
          children: 0,
          infants: 0,
          pets: 0,
          cardDetails: {
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            cardHolderName: "",
          },
          areConditionsAccepted: false,
        }
      : {
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address1: formData.street,
          address2: "",
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          listingId: params.id,
          source: params.source,
          fromDate: searchParamsValues.fromDate?.format("YYYY-MM-DD"),
          toDate: searchParamsValues.toDate?.format("YYYY-MM-DD"),
          adults: Number(searchParamsValues.numberOfGuests),
          children: 0,
          infants: 0,
          pets: 0,
          cardDetails: {
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            cardHolderName: "",
          },
          areConditionsAccepted: false,
        },
    validationSchema: userId ? userIdSchema : missingUserIdSchema,
    onSubmit: () => console.log("Submitting"),
  });

  useEffect(() => {
    if (paymentCompleted && router) {
      const queryString = searchParams instanceof URLSearchParams ? searchParams.toString() : '';
      router.push(
        `/book/${params.source}/${params.id}/payment?${queryString}`
      );
    }
  }, [params.id, params.source, router, searchParams, paymentCompleted]);

  return (
    <form
      action={async () => {
        const allValues = {
          ...formik.values,
          cardDetails: {
            ...formik.values.cardDetails,
            cardNumber: formik.values.cardDetails.cardNumber.replace(/-/g, ""),
            expiryDate: formik.values.cardDetails.expiryDate.replace(
              /(\d{2})\/(\d{2})/,
              "$1/20$2"
            ),
          },
        };
        const { cardDetails, ...initialValuesWithoutCardDetails } = allValues;
        const modifiedValues = removeEmptyValues(
          initialValuesWithoutCardDetails
        );

        const response = await bookingPayment({
          ...modifiedValues,
          cardDetails,
        } as IBookingPaymentArgs);

        const errorResponse = typeof response === "string";
        toastNotifier(response);
        setPaymentCompleted(errorResponse ? false : true);
      }}
      className="flex flex-col gap-8"
    >
      {/* Rest of your JSX form components here */}
      <Toaster />
    </form>
  );
}
