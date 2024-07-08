"use client";

import Link from "next/link";
import { Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import { RangeDatePicker, FormDialog, SelectInput } from "../../common";
import type { SelectChangeEvent } from "@mui/material";
import type { DateRangeType } from "../../home/SearchCard";
import type { ListingData } from "~/app/(application)/definitions";
import { PricingDetails } from "./PricingDetails";
import { useState, useEffect } from "react";
import { getPricingDetails } from "~/app/(application)/actions";
import { useAppSearchParams } from "~/context/SearchParamsContext";

export interface IPricingDetails {
  totalPrice: number;
  components: {
    name: string;
    total: number;
  }[];
}

export default function BookNowContent({
  listingInfo,
  params,
}: {
  listingInfo: ListingData;
  params: {
    source: string;
    id: string;
  };
}) {
  const pathname = usePathname();
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();

  const isPriceCalculated =
    pathname.endsWith("billing-address") || pathname.endsWith("payment");

  const [dates, setDates] = useState<DateRangeType>([
    searchParamsValues.FromDate,
    searchParamsValues.ToDate,
  ]);
  const [pricingDetails, setPricingDetails] = useState<
    IPricingDetails | undefined
  >();

  useEffect(() => {
    if (searchParamsValues?.FromDate && searchParamsValues.ToDate) {
      async function fetchPricingDetails() {
        try {
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
        }
      }
      void fetchPricingDetails();
    }
  }, [
    searchParamsValues.FromDate,
    searchParamsValues.ToDate,
    searchParamsValues.NumberOfGuests,
    params.source,
    params.id,
  ]);

  useEffect(() => {
    updateSearchParams(["FromDate", "ToDate"], [dates[0], dates[1]]);
  }, [dates, updateSearchParams]);

  return (
    <div
      className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5 ${isPriceCalculated && "pointer-events-none bg-[#fAfAfA]"}`}
    >
      {!isPriceCalculated ? (
        <div className="flex justify-between">
          <h6>Choose your preferred day</h6>
          <h6 className="font-medium text-primary">View calendar</h6>
        </div>
      ) : null}
      <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
        <div
          className="relative px-6 py-5"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <RangeDatePicker size="small" dates={dates} setDates={setDates} />
        </div>
        <div className="px-6 py-5">
          <SelectInput
            size="small"
            value={searchParamsValues.NumberOfGuests ?? "1"}
            onChange={(e: SelectChangeEvent<string>) =>
              updateSearchParams(["NumberOfGuests"], [e.target.value])
            }
          />
        </div>
      </div>
      {!isPriceCalculated ? (
        <Link
          href={`/book/${params.source}/${params.id}/billing-address?${searchParams.toString()}`}
          className="flex h-[58px] w-full justify-center rounded-full bg-primary py-4 text-white hover:border hover:border-primary hover:bg-white hover:text-primary"
        >
          Book now
        </Link>
      ) : null}
      <Divider />
      {!isPriceCalculated && (
        <FormDialog
          title="Inquire now"
          subtitle="Have a question or feedback? Fill out the form
            below, and we'll get back to you as soon as possible."
          listing={listingInfo}
        >
          <button className="w-full rounded-full border border-primary bg-white py-4 text-primary hover:bg-primary hover:text-white">
            Inquire now
          </button>
        </FormDialog>
      )}
      {isPriceCalculated ? (
        <PricingDetails
          listing={listingInfo}
          pricingDetails={pricingDetails}
          nights={searchParamsValues.ToDate.diff(
            searchParamsValues.FromDate,
            "day",
          )}
        />
      ) : null}
    </div>
  );
}
