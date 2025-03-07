import {
  getListingData,
  getSiteConfigurations,
} from "~/app/(application)/actions";
import Gallery from "~/app/ui/components/listing/Gallery";
import Overview from "~/app/ui/components/listing/OverviewSection";
import BookNow from "~/app/ui/components/listing/BookNow/BookNowCard.server";
import {
  Breadcrumbs,
  SimilarCardsSkeleton,
  MapContainer,
} from "~/app/ui/components/common";
import SimilarCards from "~/app/ui/components/listing/SimilarCards/SimilarCards";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";
import { Divider } from "@mui/material";
import { Suspense } from "react";
import { type Metadata } from "next";
import { attachSearchParamsAsStringWithoutMatch } from "~/app/utils/searchParamsHelper";

export async function generateMetadata({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}): Promise<Metadata> {
  // fetch data
  const product = await getListingData({
    source: params.source,
    id: params.id,
  });

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: [product?.imageUrl ?? ""],
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    category?: string;
    city?: string;
    state?: string;
    property?: string;
    numberOfGuests?: string;
    toDate?: string;
    fromDate?: string;
  };
}) {
  const pageParams = params ?? "";

  const siteConfigurations = (await getSiteConfigurations())!;
  const listing = (await getListingData(pageParams))!;
  const query = new URLSearchParams(searchParams);

  return (
    <main className="flex flex-col items-center px-4 lg:px-4 xl:px-0">
      <div className="custom-max-widths items-center justify-center">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: "Listings",
              href: attachSearchParamsAsStringWithoutMatch(
                "/listings?",
                searchParams,
              ),
            },
            {
              label: listing.city,
              href: attachSearchParamsAsStringWithoutMatch(
                `/listings?city=${listing.city}`,
                searchParams,
              ),
            },
            ...(listing.propertyName
              ? [
                  {
                    label: `${listing.propertyName}`,
                    href: attachSearchParamsAsStringWithoutMatch(
                      `/listings?property=${listing.propertyName}`,
                      searchParams,
                    ),
                  },
                ]
              : []),
            {
              label: `${listing.name}`,
              href: `/listing/${params.source}/${params.id}`,
              active: true,
            },
          ]}
        />
        <div className="flex flex-col items-start justify-between pb-6 md:flex-row">
          <h1 className="text-2xl leading-tight md:w-2/3 md:text-3xl">
            {listing.name}, {listing.city}, {listing.state}
          </h1>
          <div className="mt-4 flex max-h-[50px] w-full shrink-0 items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2 md:mt-0 md:w-[240px] md:py-2">
            Call Now:
            <span className="ml-1 font-medium">
              <a href={`tel:${siteConfigurations.contact.phone}`}>
                {siteConfigurations.contact.phone}
              </a>
            </span>
          </div>
        </div>
        <Gallery listing={listing} />
        <div className="my-10 flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
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
          <div className="flex shrink-0 sm:w-[420px]">
            <BookNow params={params} />
          </div>
        </div>
        <Divider className="mb-10" />
        <PolicyAndRules listing={listing} />
        <h5 className="mb-10 text-xl font-bold md:text-2xl">
          View similar homes in this area
        </h5>
        <div className="no-scrollbar mb-10 flex snap-x gap-5 overflow-auto will-change-scroll">
          <Suspense fallback={<SimilarCardsSkeleton />}>
            <SimilarCards pageParams={pageParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
