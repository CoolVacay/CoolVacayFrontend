"use client";

import React, { useEffect, useState } from 'react';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getPricingDetails } from '~/app/(application)/actions';
import { type IListingData } from '~/app/(application)/definitions';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
);

interface GuestyPaymentFormProps {
  fromDate: string;
  toDate: string;
  source: string;
  numberOfGuests: string;
  listingInfo: IListingData;
}

interface PricingResponse {
  clientSecret: string;
}

const LoadingSkeleton = () => (
    <div className="animate-pulse h-[60vh]">
        <div className='w-full flex flex-col justify-center items-center gap-2'>
            <div className="bg-gray-300 h-6 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/2 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/2 mb-4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/4 mb-4 rounded"></div>
        </div>
    </div>
  );

function GuestyPaymentForm({
  fromDate,
  toDate,
  source,
  numberOfGuests,
  listingInfo,
}: GuestyPaymentFormProps) {
  const [options, setOptions] = useState<{ clientSecret: string } | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingDetails = async () => {
      try {
        const details = await getPricingDetails(
          source,
          listingInfo.id,
          fromDate,
          toDate,
          numberOfGuests
        );
        console.log(details)

        // Fetch client secret from the server
        const resp = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            successRedirectUrl: `${window.location.origin}/book/${source}/${listingInfo.id}/reservation-successful?numberOfGuests=${numberOfGuests}&fromDate=${fromDate}&toDate=${toDate}`,
            pricingDetails: details,
            quoteId: details?.quoteId
          }),
        });

        const res = await resp.json() as PricingResponse;
        setOptions({ clientSecret: res.clientSecret });
      } catch (err) {
        console.error('Error fetching pricing details:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchPricingDetails();
  }, [source, listingInfo.id, fromDate, toDate, numberOfGuests]);

  if(loading) return <LoadingSkeleton />;
  // If the clientSecret is not available yet, render nothing
  if (!options) return null;

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

export default GuestyPaymentForm;
