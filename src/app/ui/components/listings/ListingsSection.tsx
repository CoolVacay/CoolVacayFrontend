import { getFetch } from "~/app/utils/api-helpers";
import { ListingCard } from "../Cards/Cards";
import type { ListingData } from "~/app/(application)/definitions";

async function getFilteredListings(query: string) {
    try {
        const res = await getFetch(`/listings?${query}`, true);
        return res.json();
    } catch (error) {
        console.error("Error:", error);
        throw new Error(`Failed to fetch all listings`);
    }
}

export async function ListingSection({ query }: { query: string }) {
    const listings = (await getFilteredListings(query)) as ListingData[];

    return (
        <div className="grid grid-flow-row grid-cols-1 items-center justify-center gap-5 desktop:grid-cols-2">
            {listings.map((listing) => {
                return (
                    <ListingCard
                        key={listing.id}
                        name={listing.name}
                        subtitle={`${listing.city}, ${listing.state}`}
                        imageUrl={listing.imageUrl}
                        price={listing.price}
                    />
                );
            })}
        </div>
    );
}
