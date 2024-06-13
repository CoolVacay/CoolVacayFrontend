import { getFetch } from "~/app/utils/api-helpers";
import type { ListingData } from "~/app/(application)/definitions";
import { FetchError } from "~/app/utils/definitions";
import Gallery from "~/app/ui/components/listing/Gallery";
import Overview from "~/app/ui/components/listing/OverviewSection";
import BookNow from "~/app/ui/components/listing/BookNowSection";

async function getListingData({ source, id }: { source: string; id: string }) {
  try {
    const res = await getFetch<ListingData>(`/Listings/${source}/${id}`, true);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams?: {
    query?: string;
  };
}) {
  const pageParams = params ?? "";
  const listing = (await getListingData(pageParams))!;
  const query = searchParams?.query ?? "";

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center">
          <div className="w-full">
            <div className="flex w-full justify-between pb-6">
              <h1 className="pt-3 text-3xl">
                {listing.name}, {listing.city}, {listing.state}
              </h1>
              <div className="flex w-[300px] items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2">
                Call us for more info:
                <span className="ml-1 font-medium">315 434 324</span>
              </div>
            </div>
            <Gallery listing={listing} query={query} />
            <div className="flex gap-6 py-10">
              <Overview listing={listing} />
              <BookNow listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
