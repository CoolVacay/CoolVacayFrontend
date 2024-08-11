import {
  getCloseDatesListings,
  getFilteredListings,
} from "~/app/(application)/actions";
import { capitalize } from "~/app/utils/helpers";
import { ListingCard } from "../common";
import Pagination from "./Pagination";

const PAGESIZE = "6";

export async function ListingSection({ query }: { query: URLSearchParams }) {
  const listings = (await getFilteredListings(query.toString()))!;
  const closeAvailabilityListings =
    listings.totalItems < 5
      ? (await getCloseDatesListings(
          PAGESIZE,
          query.get("match")!,
          query.get("fromDate")!,
          query.get("toDate")!,
        ))!
      : [];

  const title =
    query.get("category") ??
    (query.get("match") && capitalize(query.get("match")!));

  return listings?.totalItems > 0 || closeAvailabilityListings?.length > 0 ? (
    <>
      <div className="flex place-items-baseline gap-8 pb-6">
        <h1 className="text-3xl">{`${title ? `${title} available properties` : "Available properties"}`} <p className="text-sm text-primary-grey300">
        {listings?.totalItems} properties</p></h1>
      </div>
      <div className="grid sm:grid-cols-1 gap-5 md:grid-cols-2"> 
        {listings?.items?.map((listing) => {
          return (
            <ListingCard
              id={listing.id}
              source={listing.source}
              key={listing.id}
              name={listing.name}
              subtitle={`${listing.city}, ${listing.state}`}
              imageUrl={listing.imageUrl}
              price={listing.price}
            />
          );
        })}
        {/* TODO ://modify the card */}
        {closeAvailabilityListings?.map((item) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          return (
            <ListingCard
              id={item.listing.id}
              source={item.listing.source}
              key={item.listing.id}
              name={item.listing.name}
              subtitle={`${item.listing.city}, ${item.listing.state}`}
              imageUrl={item.listing.imageUrl}
              price={item.listing.price}
              closeDates={[startDate, endDate]}
            />
          );
        })}
      </div>
      <div className="my-8 flex justify-center">
        <Pagination totalPages={listings.totalPages} />
      </div>
    </>
  ) : (
    <h6>No listings available</h6>
  );
}
