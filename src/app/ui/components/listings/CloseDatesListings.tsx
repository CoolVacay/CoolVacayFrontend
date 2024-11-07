import { getCloseDatesListings } from "~/app/(application)/actions";
import { ListingCard } from "../common";
import { getFilteredListings } from "~/app/(application)/actions";
import type { ICloseDatesListings } from "~/app/(application)/definitions";

const PAGESIZE = "4";
const MAXIMUM_LISTINGS_FOR_CLOSE_AVAILABILITY = 5;

export async function CloseDatesListings({
  query,
}: {
  query: URLSearchParams;
}) {
  const listings = (await getFilteredListings(query.toString()))!;
  let closeAvailabilityListings: ICloseDatesListings[] | null = null;

  if (listings.totalItems <= MAXIMUM_LISTINGS_FOR_CLOSE_AVAILABILITY) {
    closeAvailabilityListings = (await getCloseDatesListings(
      PAGESIZE,
      query.get("match") ?? "",
      query.get("fromDate") ?? "",
      query.get("toDate") ?? "",
      query.get("category") ?? null,
      query.get("numberOfGuests") ?? "1",
    ))!;
  }

  if (!closeAvailabilityListings) {
    return null;
  }
  return closeAvailabilityListings?.length > 0 ? (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl">
          {`${query.get("fromDate") && query.get("toDate") ? "Flexible travel dates? Check out these properties" : "Flexible travel requirements? Check out these properties"}`}
        </h1>
        <p className="text-sm text-primary-grey300">
          {closeAvailabilityListings?.length} properties
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 xl:justify-start">
        {closeAvailabilityListings?.map((item) => {
          return (
            <ListingCard
              id={item.listing.id}
              source={item.listing.source}
              key={item.listing.id}
              name={item.listing.name}
              subtitle={`${item.listing.city}, ${item.listing.state}`}
              imageUrl={item.listing.imageUrl}
              price={item.listing.price}
              closeDates={
                item.availableDates.length !== 0
                  ? item.availableDates
                  : undefined
              }
              starRating={item.listing.starRating}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div>No similar listings found</div>
  );
}
