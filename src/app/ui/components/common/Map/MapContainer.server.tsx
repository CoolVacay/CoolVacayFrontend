import { getFilteredListings } from "~/app/(application)/actions";
import MapContent from "./MapContainer.client";
import type { ListingData } from "~/app/(application)/definitions";

export default async function MapContainer({
  singleListing = false,
  query,
  listing,
}: {
  singleListing?: boolean;
  query: URLSearchParams;
  listing: ListingData[];
}) {
  const listings = singleListing
    ? listing
    : (await getFilteredListings(query.toString()))! ?? [];

  return <MapContent listings={listings} singleListing={singleListing} />;
}
