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
      <div className="flex flex-col gap-2 pb-6 xl:flex-row xl:place-items-baseline xl:gap-8">
        <h1 className="text-3xl">
          {`${title ? `${title} available properties` : "Available properties"}`}{" "}
        </h1>
        <p className="text-sm text-primary-grey300">
          {listings?.totalItems} properties
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 xl:justify-between">
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
