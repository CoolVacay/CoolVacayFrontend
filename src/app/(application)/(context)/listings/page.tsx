import { ListingSection } from "~/app/ui/components/listings/ListingsSection";
import {
  FilteredListingsSkeleton,
  MapContainer,
  MapSkeleton,
} from "~/app/ui/components/common";
import Filters from "~/app/ui/components/listings/FIlters";
import { Suspense } from "react";
import { getLocationsList } from "../../actions";
export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams);
  const locationsList = (await getLocationsList())!;
  return (
    <main className="static w-full pl-[70px]">
      <div className="flex">
        <div className="flex w-5/12 flex-col pb-6 desktop:w-7/12">
          <Filters locationsList={locationsList} />
          <Suspense
            fallback={<FilteredListingsSkeleton />}
            key={query.toString()}
          >
            <ListingSection query={query} />
          </Suspense>
        </div>
        <Suspense fallback={<MapSkeleton />} key={query.toString()}>
          <div className="sticky right-0 top-0 h-full w-7/12 flex-none desktop:w-5/12">
            <MapContainer query={query} listing={[]} />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
