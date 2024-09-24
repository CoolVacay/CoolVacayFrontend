import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";

import {
  AllListingsSkeleton,
  FeaturedListingsSkeleton,
  PopularCategoriesSkeleton,
} from "../ui/components/common/Skeletons/Skeletons";
import {
  BlogSection,
  AllListingsSection,
  HeroSection,
  PopularCategories,
  FeaturedListingsSection,
  DiscoverSection,
} from "../ui/components/home/index";
import { Newsletter, IconGenerator } from "../ui/components/common";

export const metadata: Metadata = {
  title: "CoolVacay | Find Your Dream Vacation Rentals & Travel Deals",
  description:
    "Discover unbeatable vacation rentals and deals with CoolVacay. Book easily with our engine, from luxury stays to budget-friendly options.",
};

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative -mt-24 flex h-lvh sm:h-[714px]">
        <div className="absolute flex h-lvh w-full sm:h-[714px]">
          <Image
            alt="Coolvacay background image"
            src="/landing_background.png"
            quality={70}
            fill
            priority={true}
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(50%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center px-4">
        <div className="custom-max-widths items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <HeroSection />
          </div>
          <div className="w-full">
            <h2 className="main-title">Popular Categories</h2>
            <Suspense fallback={<PopularCategoriesSkeleton />}>
              <PopularCategories />
            </Suspense>
            <h2 className="main-title">Featured Listings</h2>
            <Suspense fallback={<FeaturedListingsSkeleton />}>
              <FeaturedListingsSection />
            </Suspense>
          </div>
          <DiscoverSection />
          <section className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="main-title">All Listings</h2>
              <Link href="/listings" className="flex items-center text-primary">
                See all listings
                <span className="ml-2">
                  <IconGenerator src="/link.svg" width="13px" alt="link icon" />
                </span>
              </Link>
            </div>
            <Suspense fallback={<AllListingsSkeleton />}>
              <AllListingsSection page={1} />
            </Suspense>
            <Newsletter className="my-6 sm:my-8" />
            <Suspense fallback={<AllListingsSkeleton />}>
              <AllListingsSection page={2} />
            </Suspense>
          </section>
          <Suspense fallback={<FeaturedListingsSection />}>
            <BlogSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
