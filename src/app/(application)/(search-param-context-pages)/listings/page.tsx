import { type Metadata } from "next";
import { Suspense } from "react";
import {
  FilteredListingsSkeleton,
  FiltersSkeleton,
  MapContainer,
  MapSkeleton,
} from "~/app/ui/components/common";
import { ListingSection } from "~/app/ui/components/listings/ListingsSection";
import { CloseDatesListings } from "~/app/ui/components/listings/CloseDatesListings";
import Filters from "~/app/ui/components/listings/Filters.server";

export const metadata: Metadata = {
  title: "CoolVacay | Listings Page",
  description: "View all our listings here",
};
export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams);

  return (
    <main className="static w-full p-4 xl:py-0 xl:pl-20 xl:pr-0">
      <div className="relative w-full gap-4 xl:flex">
        <div className={`flex w-full shrink-0 flex-col pb-6 xl:max-w-[1100px]`}>
          <Suspense fallback={<FiltersSkeleton />} key={query.toString()}>
            <Filters />
          </Suspense>

          <div
            className={`${searchParams.isMapMode == "true" ? "hidden" : ""} flex flex-col justify-between gap-4`}
          >
            <Suspense
              fallback={<FilteredListingsSkeleton />}
              key={query.toString()}
            >
              <ListingSection query={query} />
            </Suspense>
            <div className="pt-5">
              <Suspense
                fallback={<FilteredListingsSkeleton />}
                key={`closeDates-${query.toString()}`}
              >
                <CloseDatesListings query={query} />
              </Suspense>
            </div>
          </div>
        </div>
        <div
          className={`${searchParams.isMapMode == "false" || !searchParams.isMapMode ? "hidden xl:block" : ""} relative right-0 top-0 h-[100vh] xl:sticky xl:h-full xl:w-full`}
        >
          <Suspense fallback={<MapSkeleton />} key={query.toString()}>
            <MapContainer query={query} listing={[]} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
