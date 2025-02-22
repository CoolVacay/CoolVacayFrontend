"use client";

import { useState } from "react";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import type { SelectChangeEvent } from "@mui/material";
import { PricingDetails } from "./PricingDetails";
import { RangeDatePicker, SelectInput } from "../../common";
import type { IParams } from "~/app/(application)/definitions";
import type { DateRangeType } from "../../home/SearchCard";
import { usePathname } from "next/navigation";

export default function PricingDetailsCardContent({
  params,
}: {
  params: IParams;
}) {
  const pathName = usePathname();
  const { searchParamsValues, updateSearchParams } = useAppSearchParams();
  const [dates, setDates] = useState<DateRangeType | ["", ""]>([
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
          <RangeDatePicker
            size="medium"
            selectedDates={dates}
            setDates={setDates}
          />
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
      {!pathName.includes("/reservation-successful") ? (
        <PricingDetails
          params={params}
          searchParamsValues={searchParamsValues}
        />
      ) : null}
    </div>
  );
}
