"use client";
import React, { useEffect, useState } from 'react';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getPricingDetails } from '~/app/(application)/actions';
import { IListingData } from '~/app/(application)/definitions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function GuestyPaymentForm({
  fromDate,
  toDate,
  source,
  numberOfGuests,
  listingInfo,
}: {
  fromDate: string;
  toDate: string;
  source: string;
  numberOfGuests: string;
  listingInfo: IListingData;
}) {
  const [options, setOptions] = useState<{ clientSecret: string } | undefined>(undefined);

  useEffect(() => {
    async function fetchPricingDetails() {
      try {
        const details = await getPricingDetails(
          source,
          listingInfo.id!,
          fromDate,
          toDate,
          numberOfGuests,
        );

        // Fetch client secret from the server
        const resp = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            successRedirectUrl: `${window.location.origin}/book/${source}/${listingInfo.id}/reservation-successful?numberOfGuests=${numberOfGuests}&fromDate=${fromDate}&toDate=${toDate}`,
            pricingDetails: details,
          }),
        });

        const res = await resp.json();
        setOptions({ clientSecret: res.clientSecret });
      } catch (err) {
        console.error(err);
      }
    }

    void fetchPricingDetails();
  }, [source, listingInfo.id, fromDate, toDate, numberOfGuests]);

  // If the clientSecret is not available yet, render nothing
  if (!options) return null;

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

export default GuestyPaymentForm;
