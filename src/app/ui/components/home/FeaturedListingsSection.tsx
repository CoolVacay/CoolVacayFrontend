import type { ListingData } from "../../../(application)/definitions";
import { getFetch } from "../../../utils/api-helpers";
import { truncateText } from "../../../utils/helpers";
import { FetchError } from "~/app/utils/definitions";
import { MainCard } from "../common";

async function getFeaturedListings() {
  try {
    const res = await getFetch<ListingData[]>("/listings/featured");
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch all listings");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function FeaturedListingsSection() {
  const featuredListings = (await getFeaturedListings())!;

  return (
    <section className="flex w-full justify-between pb-10">
      {featuredListings?.length > 0 ? (
        featuredListings.map((listing) => {
          return (
            <MainCard
              id={listing.id}
              source={listing.source}
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          );
        })
      ) : (
        <h6>There are no featured listings at this moment</h6>
      )}
    </section>
  );
}
