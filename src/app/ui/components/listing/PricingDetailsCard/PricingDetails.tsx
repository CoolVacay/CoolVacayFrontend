"use client";

import type { IParams, ListingData } from "~/app/(application)/definitions";
import type { IPricingDetails } from "../BookNow/BookNowCard.client";
import { useEffect, useState } from "react";
import { getPricingDetails } from "~/app/(application)/actions";
import type { ISearchParams } from "~/context/SearchParamsContext";
import { PricingDetailsSkeleton } from "../../common";

export function PricingDetails({
  listing,
  nights,
  searchParamsValues,
  params,
}: {
  listing: ListingData | undefined;
  nights: number;
  searchParamsValues: ISearchParams;
  params: IParams;
}) {
  const [loading, setLoading] = useState(true);
  const [pricingDetails, setPricingDetails] = useState<
    IPricingDetails | undefined
  >();

  useEffect(() => {
    async function fetchPricingDetails() {
      try {
        setLoading(true);
        const details = await getPricingDetails(
          params.source,
          params.id,
          searchParamsValues.FromDate.format("YYYY-MM-DD"),
          searchParamsValues.ToDate.format("YYYY-MM-DD"),
          searchParamsValues.NumberOfGuests,
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
    searchParamsValues.FromDate,
    searchParamsValues.ToDate,
    searchParamsValues.NumberOfGuests,
    params.source,
    params.id,
  ]);

  return loading ? (
    <PricingDetailsSkeleton />
  ) : (
    <div className="flex flex-col gap-4 font-medium">
      <h6 className="flex justify-between text-lg text-[#858C93]">
        ${listing?.price} x {nights} nights
        <span className="text-black">
          ${pricingDetails?.components[0]?.total}
        </span>
      </h6>

      {pricingDetails?.components.map((fee, index) => {
        if (index > 0) {
          return (
            <h6
              key={index}
              className="flex justify-between text-lg text-[#858C93]"
            >
              {fee.name}
              <span className="text-black">${fee.total}</span>
            </h6>
          );
        } else {
          return null;
        }
      })}
      <h5 className="flex justify-between text-2xl">
        Total
        <span>${pricingDetails?.totalPrice}</span>
      </h5>
    </div>
  );
}
