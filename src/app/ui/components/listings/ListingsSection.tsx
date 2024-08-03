import { getFilteredListings } from "~/app/(application)/actions";
import { capitalize } from "~/app/utils/helpers";
import { ListingCard } from "../common";
import Pagination from "./Pagination";

export async function ListingSection({ query }: { query: URLSearchParams }) {
  const listings = (await getFilteredListings(query.toString()))!;

  const title =
    query.get("category") ??
    (query.get("match") && capitalize(query.get("match")!));

  return listings?.totalItems > 0 ? (
    <>
      <div className="flex place-items-baseline gap-8 pb-6">
        <h1 className="text-3xl">{`${title ? `${title} available properties` : "Available properties"}`}</h1>
        <h6 className="text-sm text-primary-grey300">
          {listings?.totalItems} properties
        </h6>
      </div>
      <div className="grid grid-cols-1 gap-5 desktop:grid-cols-2">
        {listings.items.map((listing) => {
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
      </div>
      <div className="my-8 flex justify-center">
        <Pagination totalPages={listings.totalPages} />
      </div>
    </>
  ) : (
    <h6>No listings available</h6>
  );
}
