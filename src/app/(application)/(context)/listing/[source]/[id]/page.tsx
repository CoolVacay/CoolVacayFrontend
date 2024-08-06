import { getListingData } from "~/app/(application)/actions";
import { capitalize } from "~/app/utils/helpers";

import Gallery from "~/app/ui/components/listing/Gallery";
import Overview from "~/app/ui/components/listing/OverviewSection";
import BookNow from "~/app/ui/components/listing/BookNow/BookNowCard.server";
import { Breadcrumbs, MapContainer } from "~/app/ui/components/common";
import SimilarCards from "~/app/ui/components/listing/SimilarCards/SimilarCards";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";
import { Divider } from "@mui/material";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    category: string;
    match: string;
  };
}) {
  const pageParams = params ?? "";
  const listing = (await getListingData(pageParams))!;
  const query = new URLSearchParams(searchParams);
  const navigateHome = !(query.get("match") ?? query.get("category"));

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center">
          <div className="w-full">
            <Breadcrumbs
              navigateHome={navigateHome}
              breadcrumbs={[
                {
                  label: navigateHome
                    ? "Home"
                    : query.get("category")
                      ? `${capitalize(query.get("category")!)} listings`
                      : "Listings",
                  href: "/listings",
                },
                {
                  label: `${listing.name}`,
                  href: `/listing/${params.source}/${params.id}`,
                  active: true,
                },
              ]}
            />
            <div className="flex w-full justify-between pb-6">
              <h1 className="w-2/3 pt-3 text-3xl">
                {listing.name}, {listing.city}, {listing.state}
              </h1>
              <div className="flex max-h-[50px] w-[300px] items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2">
                Call us for more info:
                <span className="ml-1 font-medium">(315) 434-2324</span>
              </div>
            </div>
            <Gallery listing={listing} />
            <div className="my-10 flex gap-6">
              <div>
                <Overview listing={listing} />
                <div className="max-h-60 w-full">
                  <MapContainer
                    singleListing={true}
                    query={query}
                    listing={[{ ...listing }]}
                  />
                </div>
                <div className="mt-6">
                  <h1 className="text-sm text-[#676D73]">
                    Listed by{" "}
                    <span className="text-sm font-medium text-black">
                      {listing.source}
                    </span>
                  </h1>
                </div>
              </div>
              <BookNow params={params} />
            </div>
            <Divider className="mb-10" />
            <PolicyAndRules listing={listing} />
            <h5 className="mb-10 text-2xl font-bold">
              View similar homes in this area
            </h5>
            <div className="no-scrollbar mb-10 flex snap-x gap-5 overflow-auto will-change-scroll">
              <SimilarCards pageParams={pageParams} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
