import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { IconGenerator, Newsletter, MainCard } from "../common";
import { getFetch } from "../../../utils/api-helpers";
import type { ListingData } from "../../../(application)/definitions";
import { truncateText } from "../../../utils/helpers";

const startDate = dayjs().format("YYYY-MM-DD");
const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");

export async function getAllListings() {
  try {
    const results = await Promise.allSettled([
      getFetch<ListingData[]>(
        `/listings?limit=8&offset=0&fromDate=${startDate}&toDate=${endDate}`,
      ),
      getFetch<ListingData[]>(
        `/listings?limit=8&offset=8&fromDate=${startDate}&toDate=${endDate}`,
      ),
    ]);

    const firstListings =
      results[0].status === "fulfilled" ? results[0].value : [];
    const lastListings =
      results[1].status === "fulfilled" ? results[1].value : [];

    return [firstListings, lastListings];
  } catch (error) {
    console.error("Error:", error);
    return [[], []];
  }
}

export async function AllistingsSection() {
  const [firstListings, lastListings] = (await getAllListings()) as [
    ListingData[],
    ListingData[],
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px]">All listings</h1>
        <Link href="/listings" className="flex items-center text-primary">
          See all listings
          <span className="ml-2">
            {<IconGenerator src="/link.svg" width="13px" alt="link icon" />}
          </span>
        </Link>
      </div>
      {firstListings && firstListings.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
          {firstListings?.map((listing) => {
            return (
              <Link
                key={listing.id}
                href={`/listing/${listing.source}/${listing.id}`}
                className="h-82"
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
        <h2 className="text-[16px] py-6">
          There are no available listings at this moment.
        </h2>
      )}
      <div>
        <Newsletter />
      </div>
      {lastListings && lastListings.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
          {lastListings?.map((listing) => {
            return (
              <Link
                key={listing.id}
                href={`/listing/${listing.source}/${listing.id}`}
                className="h-82"
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
        <div className="py-4"></div>
      )}
    </section>
  );
}
