"use client";

import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import type { ListingData } from "~/app/(application)/definitions";

export function Content({ listing }: { listing: ListingData }) {
  const searchParams = useSearchParams();
  const startDate = dayjs(searchParams.get("FromDate")).format("MMM DD, YYYY");
  const endDate = dayjs(searchParams.get("ToDate")).format("MMM DD, YYYY");
  const numberOfGuests = searchParams.get("NumberOfGuests");

  return (
    <div className="flex gap-16">
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Dates</div>
        <p className="text-sm text-[#676D73]">
          {startDate} - {endDate}
        </p>
      </div>
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Guests</div>
        <p className="text-sm text-[#676D73]">{numberOfGuests}</p>
      </div>
      <div className={`flex flex-col justify-center gap-3`}>
        <div className="mb-1 text-base font-medium">Room type</div>
        <p className="text-sm text-[#676D73]">{listing?.propertyType}</p>
      </div>
    </div>
  );
}
