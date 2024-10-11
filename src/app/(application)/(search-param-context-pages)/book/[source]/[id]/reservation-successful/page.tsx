"use client";

import { IconGenerator } from "~/app/ui/components/common";
import { useFormContext } from "../FormContext";
import { useEffect } from "react";
import { bookingPayment } from "~/app/(application)/actions";

export default function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    numberOfGuests: string;
    fromDate: string;
    toDate: string;
    session_id: string;
  };
}) {
  useEffect(() => {
    async function fetchPricingDetails() {
      try {
        // Fetch client secret from the server
        const resp = await fetch(`/api/create-checkout-session?session_id=${searchParams.session_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const {session: res} = await resp.json();

        const obj = {
          firstName: res.customer_details.name.split(" ")[0] ?? "",
          lastName: res.customer_details.name.split(" ")[1] ?? "",
          email: res.customer_details.email,
          phone: res.customer_details.phone,
          address1: res.customer_details.address.line1,
          address2: res.customer_details.address.line2 ?? "",
          city: res.customer_details.address.city,
          state: res.customer_details.address.state,
          zip: res.customer_details.address.postal_code,
          country: res.customer_details.address.country, 
          listingId: params.id,
          source: params.source,
          fromDate: searchParams.fromDate,
          toDate: searchParams.toDate,
        }

        console.log({obj})

        //await bookingPayment(obj);
      } catch (err) {
        console.error(err);
      }
    }

    void fetchPricingDetails();
    // async function placeReservation() {
    //   await bookingPayment()
    // }
  }, []);

  return (
    <div className="m-4 flex w-full flex-col items-center justify-center">
      <IconGenerator
        src="/blue_check.svg"
        width="94px"
        alt="Booking confirmed icon"
        className="my-8"
      />
      <div className="flex flex-col items-center gap-3 text-[#676D73]">
        <h1 className="text-2xl font-bold text-black">Thank you!</h1>
        <h2 className="text-[16px]">Your booking details have been sent to your email.</h2>
        <h3 className="text-[16px]">
          You can download the booking as PDF below, or check it on the
          dashboard
        </h3>
      </div>
    </div>
  );
}
