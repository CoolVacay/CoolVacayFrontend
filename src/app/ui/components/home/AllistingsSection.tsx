import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { MainCard } from "../common";
import { truncateText } from "../../../utils/helpers";
import { getFilteredListings } from "~/app/(application)/actions";

const startDate = dayjs().format("YYYY-MM-DD");
const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

export async function AllistingsSection({ page }: { page: number }) {
  const listings = (await getFilteredListings(
    `fromDate=${startDate}&toDate=${endDate}&pageSize=8&pageNum=${page}`,
  ))!;
  return listings?.items.length > 0 ? (
    <div className="no-scrollbar my-10 flex items-center gap-5 overflow-auto sm:flex-row sm:flex-wrap sm:justify-between">
      {listings?.items.map((listing) => {
        return (
          <Link
            key={listing.id}
            href={`/listing/${listing.source}/${listing.id}?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1`}
            className="h-[340px]"
          >
            <MainCard
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          </Link>
        );
      })}
    </div>
  ) : (
    <h2 className="py-6 text-[16px]">
      There are no available listings at this moment.
    </h2>
  );
}
