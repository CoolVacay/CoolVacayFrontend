import { getFilteredListings } from "~/app/(application)/actions";
import MapContent from "./MapContainer.client";
import type { IListingData, IParams } from "~/app/(application)/definitions";

export default async function MapContainer({
  singleListing = false,
  query,
  listing,
}: {
  singleListing?: boolean;
  query: URLSearchParams;
  listing: IListingData[];
}) {
  const listings = singleListing
    ? listing
    : (await getFilteredListings(query.toString() as IParams))! ?? [];

  return <MapContent listings={listings} singleListing={singleListing} />;
}
