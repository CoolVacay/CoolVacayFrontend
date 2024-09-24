import { getListingData } from "~/app/(application)/actions";
import { capitalize } from "~/app/utils/helpers";

import Gallery from "~/app/ui/components/listing/Gallery";
import Overview from "~/app/ui/components/listing/OverviewSection";
import BookNow from "~/app/ui/components/listing/BookNow/BookNowCard.server";
import {
  Breadcrumbs,
  SimilarCardsSkeleton,
  MapContainer,
} from "~/app/ui/components/common";
import SimilarCards from "~/app/ui/components/listing/SimilarCards/SimilarCards";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";
import { Divider } from "@mui/material";
import { Suspense } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "CoolVacay | Listings by ID page",
  description: "View details about our listings here",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    category: string;
    match: string;
  };
}) {
  const pageParams = params ?? "";

  const listing = (await getListingData(pageParams))!;
  const query = new URLSearchParams(searchParams);
  const navigateHome = !(query.get("match") ?? query.get("category"));

  return (
    <main className="flex flex-col items-center px-4 lg:px-4 xl:px-0">
      <div className="custom-max-widths items-center justify-center">
        <Breadcrumbs
          navigateHome={navigateHome}
          breadcrumbs={[
            {
              label: navigateHome
                ? "Home"
                : query.get("category")
                  ? `${capitalize(query.get("category")!)} listings`
                  : "Listings",
              href: "/listings",
            },
            ... listing.propertyName ? 
              [{label:`${listing.propertyName}`, href:`/listings?numberOfGuests=1&match=${listing.propertyName}`}] 
              : [],
            {
              label: `${listing.name}`,
              href: `/listing/${params.source}/${params.id}`,
              active: true,
            },
          ]}
        />
        <div className="flex flex-col items-start justify-between pb-6 md:flex-row">
          <h1 className="text-2xl leading-tight md:w-2/3 md:text-3xl">
            {listing.name}, {listing.city}, {listing.state}
          </h1>
          <div className="mt-4 flex max-h-[50px] w-full shrink-0 items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2 md:mt-0 md:w-[240px] md:py-2">
            Call Now:
            <span className="ml-1 font-medium">
              <a href="tel:302-581-9342">(302) 581-9342</a>
            </span>
          </div>
        </div>
        <Gallery listing={listing} />
        <div className="my-10 flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <Overview listing={listing} />
            <div className="max-h-60 w-full">
              <MapContainer
                singleListing={true}
                query={query}
                listing={[{ ...listing }]}
              />
            </div>
            <div className="mt-6">
              <h1 className="text-sm text-[#676D73]">
                Listed by{" "}
                <span className="text-sm font-medium text-black">
                  {listing.source}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 sm:w-[420px]">
            <BookNow params={params} />
          </div>
        </div>
        <Divider className="mb-10" />
        <PolicyAndRules listing={listing} />
        <h5 className="mb-10 text-xl font-bold md:text-2xl">
          View similar homes in this area
        </h5>
        <div className="no-scrollbar mb-10 flex snap-x gap-5 overflow-auto will-change-scroll">
          <Suspense fallback={<SimilarCardsSkeleton />}>
            <SimilarCards pageParams={pageParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
