import type { ListingData } from "../(application)/definitions";
import { getFetch } from "../utils/api-helpers";
import { truncateText } from "../utils/helpers";
import MainCard from "./components/MainCard/MainCard";

//TODO: replace the endpoint with the actual featured listings endpoint
async function getFeaturedListings() {
  try {
    const res = await getFetch(
      "/Listings?Limit=5&Offset=0&FromDate=2024-04-30&ToDate=2024-05-30",
      true,
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to fetch featured listings`);
  }
}

export default async function FeaturedListingsSection() {
  const featuredListings = (await getFeaturedListings()) as ListingData[];

  return (
    <section className="flex-col pb-10">
      <h1 className="py-9 text-[28px]">Featured Listings</h1>
      <div className="flex justify-evenly gap-5	">
        {featuredListings.map((listing, index: number) => {
          return (
            // TODO: till we get the correct endpoint
            index < 3 && (
              <MainCard
                name={truncateText(listing.name, 30)}
                location={`${listing.city}, ${listing.state}`}
                key={listing.id}
                imgHeight={240}
                imageUrl={listing.imageUrl}
                propertyType={listing.propertyType}
                squareFeets={listing.squareFeets}
              />
            )
          );
        })}
      </div>
    </section>
  );
}
