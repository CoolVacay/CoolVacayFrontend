"use client";

import React, { useEffect, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { IListingData } from "~/app/(application)/definitions";
import type { IPricingDetails } from "~/app/ui/components/listing/BookNow/BookNowCard.client";
import { CircularProgress } from "@mui/material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

interface GuestyPaymentFormProps {
  source: string;
  listingInfo: IListingData;
  bookingDetails: IPricingDetails;
  successRedirectUrl: string;
}

interface PricingResponse {
  clientSecret: string;
}

function GuestyPaymentForm({
  bookingDetails,
  source,
  listingInfo,
  successRedirectUrl,
}: GuestyPaymentFormProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        successRedirectUrl: `${window.location.origin}/${successRedirectUrl}`,
        pricingDetails: bookingDetails,
        quoteId: bookingDetails?.quoteId,
      }),
    })
      .then((res) => res.json() as Promise<PricingResponse>)
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [source, listingInfo.id, bookingDetails, successRedirectUrl]);

  if (loading || !clientSecret)
    return (
      <div className="flex h-[600px] w-full items-center items-center justify-center">
        <CircularProgress />
      </div>
    );

  return clientSecret ? (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  ) : (
    <div>Something went wrong, please try again later</div>
  );
}

export default GuestyPaymentForm;
