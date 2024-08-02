import { getFilteredListings } from "~/app/(application)/actions";
import { capitalize } from "~/app/utils/helpers";
import { ListingCard } from "../common";
import Pagination from "./Pagination";
import type { IParams } from "~/app/(application)/definitions";

export async function ListingSection({ query }: { query: URLSearchParams }) {
  const listings = (await getFilteredListings(query.toString() as IParams))!;
  const title =
    query.get("category") ??
    (query.get("match") && capitalize(query.get("match")!));
  const totalPages = 12;
  return listings?.length > 0 ? (
    <>
      <div className="flex place-items-baseline gap-8 pb-6">
        <h1 className="text-3xl">{`${title ? `${title} available properties` : "Available properties"}`}</h1>
        <h6 className="text-sm text-primary-grey300">
          {listings?.length} properties
        </h6>
      </div>
      <div className="grid grid-cols-1 gap-5 desktop:grid-cols-2">
        {listings.map((listing) => {
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
        <Pagination totalPages={totalPages} />
      </div>
    </>
  ) : (
    <h6>No listings available</h6>
  );
}
