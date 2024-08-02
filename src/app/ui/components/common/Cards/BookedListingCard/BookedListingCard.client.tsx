"use client";

import type { IListingData } from "~/app/(application)/definitions";
import { useAppSearchParams } from "~/context/SearchParamsContext";

export function Content({ listing }: { listing: IListingData }) {
  const { searchParamsValues } = useAppSearchParams();

  return (
    <div className="flex gap-16">
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Dates</div>
        <p className="text-sm text-[#676D73]">
          {searchParamsValues.fromDate.format("MMM DD, YYYY")} -{" "}
          {searchParamsValues.toDate.format("MMM DD, YYYY")}
        </p>
      </div>
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Guests</div>
        <p className="text-sm text-[#676D73]">
          {searchParamsValues.numberOfGuests}
        </p>
      </div>
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Room type</div>
        <p className="text-sm text-[#676D73]">{listing?.propertyType}</p>
      </div>
    </div>
  );
}
