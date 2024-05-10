import type { ListingData } from "../(application)/definitions";
import { getFetch } from "../utils/api-helpers";
import { truncateText } from "../utils/helpers";
import { MainCard } from "./components/Cards/Cards";

// TODO: replace the endpoint with the actual featured listings endpoint
async function getFeaturedListings() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await getFetch(
      "/Listings?Limit=5&Offset=0&FromDate=2024-04-30&ToDate=2024-05-30",
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
    <section className="flex w-full justify-between pb-10">
      {/* <div className=""> */}
      {featuredListings.map((listing, index: number) => {
        return (
          // TODO: till we get the correct endpoint
          index < 4 && (
            <MainCard
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          )
        );
      })}
      {/* </div> */}
    </section>
  );
}
