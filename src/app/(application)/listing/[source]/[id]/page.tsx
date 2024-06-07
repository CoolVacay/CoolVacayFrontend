import { getFetch } from "~/app/utils/api-helpers";
import type { ListingData } from "~/app/(application)/definitions";
import { FetchError } from "~/app/utils/definitions";
import Gallery from "./Gallery";

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
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const searchParams = params ?? "";
  const listing = (await getListingData(searchParams))!;

  return (
    <main className="static w-full px-[70px]">
      <div className="flex items-center justify-between pb-6">
        <h1 className="pt-3 text-3xl">
          {listing.name}, {listing.city}, {listing.state}
        </h1>
        <div className="flex w-[300px] items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2">
          Call us for more info:
          <span className="ml-1 font-medium">315 434 324</span>
        </div>
      </div>
      <Gallery listing={listing} />
      <div className="flex">
        <div className="flex w-5/12 flex-col pb-6 desktop:w-7/12"></div>
        <div className="sticky right-0 top-0 h-full w-7/12 flex-none desktop:w-5/12"></div>
      </div>
    </main>
  );
}
