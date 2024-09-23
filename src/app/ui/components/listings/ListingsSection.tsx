import { capitalizeAllWords } from "~/app/utils/helpers";
import { ListingCard } from "../common";
import Pagination from "./Pagination";
import {
  getFilteredListings,
  getProperties,
} from "~/app/(application)/actions";

export async function ListingSection({ query }: { query: URLSearchParams }) {
  const listings = (await getFilteredListings(query.toString()))!;
  const properties = await getProperties();

  const title =
    (query.get("match") && capitalizeAllWords(query.get("match")!)) ??
    query.get("category");
  const titleClassName = "text-2xl font-semibold md:text-3xl md:font-normal";
  const headingText = title
    ? `${title} Available Properties`
    : "Available Properties";

  //we are checking if the selected match value is a property and also if
  //this property has a valid URL which we can navigate to
  const property = properties?.find((property) => {
    if (property.name === query.get("match")) {
      try {
        new URL(property.sourceUrl);
        return property;
      } catch {
        return undefined;
      }
    }
  });

  return listings?.totalItems > 0 ? (
    <>
      <div className="flex flex-col gap-2 xl:flex-row xl:place-items-baseline xl:gap-8">
        {property?.sourceUrl ? (
          <a
            href={property.sourceUrl}
            target="_blank"
            className={titleClassName}
          >
            <span className="underline">{title}</span> Available Properties
          </a>
        ) : (
          <h1 className={titleClassName}>{headingText}</h1>
        )}
        <p className="text-sm text-primary-grey300">
          {listings?.totalItems} Properties
        </p>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-5 xl:justify-start">
        {listings?.items?.map((listing) => {
          return (
            <ListingCard
              id={listing.id}
              source={listing.source}
              key={listing.id}
              name={listing.name}
              propertyName={listing.propertyName}
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
    <h6>No listings available for the selected filters</h6>
  );
}
