import { Suspense } from "react";
import Image from "next/image";

import {
  AllListingsSkeleton,
  FeaturedListingsSkeleton,
  PopularCategoriesSkeleton,
} from "../ui/components/common/Skeletons/Skeletons";
import {
  BlogSection,
  AllistingsSection,
  HeroSection,
  PopularCategories,
  FeaturedListingsSection,
  DiscoverSection,
} from "../ui/components/home/index";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative -mt-[96px] flex h-[714px]">
        <div className="absolute flex h-[714px] w-full">
          <Image
            alt="Coolvacay background image"
            src="/landing_background.png"
            quality={80}
            fill
            priority={true}
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(60%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <HeroSection />
          </div>
          <div className="w-full">
            <h1 className="py-7 text-[28px]">Popular Categories</h1>
            <Suspense fallback={<PopularCategoriesSkeleton />}>
              <PopularCategories />
            </Suspense>
            <h1 className="py-9 text-left text-[28px]">Featured Listings</h1>
            <Suspense fallback={<FeaturedListingsSkeleton />}>
              <FeaturedListingsSection />
            </Suspense>
          </div>
          <DiscoverSection />
          <Suspense fallback={<AllListingsSkeleton />}>
            <AllistingsSection />
          </Suspense>
          <Suspense fallback={<FeaturedListingsSection />}>
            <BlogSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
