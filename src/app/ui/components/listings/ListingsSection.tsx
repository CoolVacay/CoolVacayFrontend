import { getFilteredListings } from "~/app/(application)/actions";
import { capitalizeAllWords } from "~/app/utils/helpers";
import { ListingCard } from "../common";
import Pagination from "./Pagination";

export async function ListingSection({ query }: { query: URLSearchParams }) {
  const listings = (await getFilteredListings(query.toString()))!;

  const title =
    query.get("category") ??
    (query.get("match") && capitalizeAllWords(query.get("match")!));

  return listings?.totalItems > 0 ? (
    <>
      <div className="flex flex-col gap-2 xl:flex-row xl:place-items-baseline xl:gap-8">
        <h1 className="text-3xl">
          {`${title ? `${title} Available Properties` : "Available Properties"}`}{" "}
        </h1>
        <p className="text-sm text-primary-grey300">
          {listings?.totalItems} Properties
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 xl:justify-start">
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
              starRating={listing.starRating}
            />
          );
        })}
      </div>
      {listings?.totalItems > 3 ? (
        <div className="my-8 flex justify-center">
          <Pagination totalPages={listings.totalPages} />
        </div>
      ) : null}
    </>
  ) : (
    <h6>No listings available for the selected dates</h6>
  );
}
