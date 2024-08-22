import { Suspense } from "react";
import { FilteredListingsSkeleton, MapContainer, MapSkeleton } from "../common";
import { ListingSection } from "./ListingsSection";
import {
  type IPopularCategoriesData,
  type ILocationsList,
} from "~/app/(application)/definitions";
import { CloseDatesListings } from "./CloseDatesListings";
import { Filters } from "./FIlters";

function Body({
  query,
  locationsList,
  searchParams,
  categories,
}: {
  query: URLSearchParams;
  locationsList: ILocationsList[];
  searchParams: Record<string, string>;
  categories: IPopularCategoriesData[];
}) {
  return (
    <main className="static w-full p-4 xl:py-0 xl:pl-20 xl:pr-0">
      <div className="relative w-full gap-4 xl:flex">
        <div
          className={`flex w-full shrink-0 flex-col pb-6 xl:max-w-[1100px]`}
        >
          <Filters locationsList={locationsList} categories={categories} />
          <div
            className={`${searchParams.isMapMode == "true" ? "hidden" : ""} flex flex-col justify-between gap-4`}
          >
            <Suspense
              fallback={<FilteredListingsSkeleton />}
              key={query.toString()}
            >
              <ListingSection query={query} />
            </Suspense>
            <Suspense
              fallback={<FilteredListingsSkeleton />}
              key={`closeDates-${query.toString()}`}
            >
              <CloseDatesListings query={query} />
            </Suspense>
          </div>
        </div>
        <div
          className={`${searchParams.isMapMode == "false" || !searchParams.isMapMode ? "hidden" : ""} relative right-0 top-0 h-[100vh] sm:sticky sm:block sm:h-full sm:w-full`}
        >
          <Suspense fallback={<MapSkeleton />} key={query.toString()}>
            <MapContainer query={query} listing={[]} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default Body;
