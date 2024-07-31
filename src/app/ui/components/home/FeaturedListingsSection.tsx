import Link from "next/link";
import { getFetch } from "../../../utils/api-helpers";
import { truncateText } from "../../../utils/helpers";
import { FetchError } from "~/app/utils/definitions";
import { IconGenerator, MainCard } from "../common";
import type { ListingData } from "../../../(application)/definitions";

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
            <div key={listing.id} className="relative">
              <Link
                href={`/listing/${listing.source}/${listing.id}`}
                className="h-82"
              >
                <MainCard
                  name={truncateText(listing.name, 50)}
                  subtitle={`${listing.city}, ${listing.state}`}
                  key={listing.id}
                  imageUrl={listing.imageUrl}
                  propertyType={listing.propertyType}
                  squareFeets={listing.squareFeets}
                />
              </Link>

              <div className="absolute left-4 top-4 flex h-7 w-[95px] items-center justify-center gap-1 rounded-md bg-primary text-xs font-semibold text-white">
                <IconGenerator
                  src="/lightining.svg"
                  alt="featured icon"
                  width="16px"
                />
                FEATURED
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-[16px]">There are no featured listings at this moment</h1>
      )}
    </section>
  );
}
