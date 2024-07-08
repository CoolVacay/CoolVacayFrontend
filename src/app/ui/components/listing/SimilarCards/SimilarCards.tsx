import { SimilarCard } from "../../common";
import { getSimilarListings } from "~/app/(application)/actions";

export default async function SimilarCards({
  pageParams,
}: {
  pageParams: {
    source: string;
    id: string;
  };
}) {
  const similarListings = (await getSimilarListings(pageParams))!;

  return similarListings
    ? similarListings.map((listing, index) => {
        return (
          <SimilarCard
            key={index}
            id={listing.id}
            source={listing.source}
            name={listing.name}
            subtitle={`${listing.city}, ${listing.state}`}
            imageUrl={listing.imageUrl}
            numberOfGuests={listing.numberOfGuests}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            price={listing.price}
            className="snap-start"
          />
        );
      })
    : "Cannot find similar homes at this moment";
}
