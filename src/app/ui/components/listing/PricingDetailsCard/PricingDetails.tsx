"use client";

import type { IParams } from "~/app/(application)/definitions";
import type { IPricingDetails } from "../BookNow/BookNowCard.client";
import { useEffect, useState } from "react";
import { getPricingDetails } from "~/app/(application)/actions";
import type { ISearchParams } from "~/context/SearchParamsContext";
import { PricingDetailsSkeleton } from "../../common";
import { Divider } from "@mui/material";

export function PricingDetails({
  searchParamsValues,
  params,
}: {
  searchParamsValues: ISearchParams;
  params: IParams;
}) {
  const [loading, setLoading] = useState(true);
  const [pricingDetails, setPricingDetails] = useState<
    IPricingDetails | undefined
  >();

  useEffect(() => {
    setLoading(true);

    async function fetchPricingDetails() {
      try {
        const details = await getPricingDetails(
          params.source!,
          params.id!,
          searchParamsValues.fromDate!.format("YYYY-MM-DD"),
          searchParamsValues.toDate!.format("YYYY-MM-DD"),
          searchParamsValues.numberOfGuests,
        );
        setPricingDetails(details);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void fetchPricingDetails();
  }, [
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
    searchParamsValues.numberOfGuests,
    params.source,
    params.id,
  ]);
  if (loading) return <PricingDetailsSkeleton />;

  return pricingDetails ? (
    <>
      <Divider />
      <div className="flex flex-col gap-4 font-medium">
        <h6 className="flex justify-between text-lg text-[#858C93]">
          {pricingDetails?.pricePerNightStr} x {pricingDetails?.numberOfNights}{" "}
          nights
          <span className="text-black">
            {pricingDetails?.components[0]?.totalStr}
          </span>
        </h6>

        {pricingDetails.components.map((fee, index) => {
          if (index > 0) {
            return (
              <p
                key={index}
                className="flex justify-between text-lg text-[#858C93]"
              >
                {fee.name}
                <span className="text-black">
                  {fee.name === "Discount" ? "-" + fee.totalStr : fee.totalStr}
                </span>
              </p>
            );
          } else {
            return null;
          }
        })}
        <h5 className="flex justify-between text-2xl">
          Total
          <span>{pricingDetails?.totalPriceStr}</span>
        </h5>
        {pricingDetails.confirmationAmountStr && (
          <h4 className="flex justify-between text-xl">
            Due Now
            <span>{pricingDetails?.confirmationAmountStr}</span>
          </h4>
        )}
      </div>
    </>
  ) : (
    <div>
      There was an issue with this request. Please try other dates or another
      listing.
    </div>
  );
}
