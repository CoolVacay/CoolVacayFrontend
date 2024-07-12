"use client";

import { RangeDatePicker, SelectInput } from "../../common";
import { Divider } from "@mui/material";
import { PricingDetails } from "./PricingDetails";
import type { IParams, ListingData } from "~/app/(application)/definitions";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { useState } from "react";
import type { DateRangeType } from "../../home/SearchCard";
import type { SelectChangeEvent } from "@mui/material";

export default function PricingDetailsCardContent({
  listingInfo,
  params,
}: {
  listingInfo: ListingData;
  params: IParams;
}) {
  const { searchParamsValues, updateSearchParams } = useAppSearchParams();
  const [dates, setDates] = useState<DateRangeType>([
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
  ]);
  return (
    <div
      className={`pointer-events-none flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] bg-[#fAfAfA] px-6 py-5`}
    >
      <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
        <div
          className="relative px-6 py-5"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <RangeDatePicker size="medium" dates={dates} setDates={setDates} />
        </div>
        <div className="px-6 py-5">
          <SelectInput
            size="medium"
            disabled={true}
            value={searchParamsValues.numberOfGuests ?? "1"}
            onChange={(e: SelectChangeEvent<string>) =>
              updateSearchParams(["numberOfGuests"], [e.target.value])
            }
          />
        </div>
      </div>
      <Divider />
      <PricingDetails
        listing={listingInfo}
        params={params}
        searchParamsValues={searchParamsValues}
        nights={searchParamsValues.toDate.diff(
          searchParamsValues.fromDate,
          "day",
        )}
      />
    </div>
  );
}
