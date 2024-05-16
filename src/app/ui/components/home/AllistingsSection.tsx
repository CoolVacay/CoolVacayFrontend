import Link from "next/link";
import React from "react";
import IconGenerator from "../common/IconGenerator";
import { MainCard } from "../Cards/Cards";
import Newsletter from "../common/Newsletter/Newsletter";
import { getFetch } from "../../../utils/api-helpers";
import type { ListingData } from "../../../(application)/definitions";
import { truncateText } from "../../../utils/helpers";

// TODO: replace the endpoint with the actual featured listings endpoint
async function getAllListings() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await getFetch(
      "/Listings?Limit=8&Offset=0&FromDate=2024-04-30&ToDate=2024-05-30",
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to fetch all listings`);
  }
}

export default async function AllistingsSection() {
  const allListings = (await getAllListings()) as ListingData[];

  return (
    <section>
      <div className="flex items-center justify-between">
        <h4 className="text-[28px]">All listings</h4>
        <Link href="/listings" className="flex items-center text-primary">
          See all listings
          <span className="ml-2">
            {<IconGenerator src="/link.svg" width="13px" alt="link icon" />}
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
        {allListings.map((listing) => {
          return (
            <MainCard
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          );
        })}
      </div>
      <div>
        <Newsletter />
      </div>
      <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
        {allListings.map((listing) => {
          return (
            <MainCard
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          );
        })}
      </div>
    </section>
  );
}
