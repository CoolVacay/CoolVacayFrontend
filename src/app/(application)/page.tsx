import { Suspense } from "react";
import AllistingsSection from "../ui/AllistingsSection";
import BlogSection from "../ui/BlogSection";
import DiscoverSection from "../ui/DiscoverSection";
import FeaturedListingsSection from "../ui/FeaturedListingsSection";
import HeroSection from "../ui/HeroSection";
import {
  AllListingsSkeleton,
  FeaturedListingsSkeleton,
} from "../ui/components/common/Skeletons/Skeletons";
// import PopularCategories from "../ui/PopularCategories";
import Image from "next/image";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative flex h-[714px] w-full">
        <Image
          alt="Coolvacay background image"
          src="/landing_background.png"
          quality={100}
          fill
          priority={true}
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "brightness(60%)",
            zIndex: -1,
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <HeroSection />
          <div className="w-full">
            {/* <Suspense fallback={<FeaturedListingsSkeleton />}>
              <PopularCategories />
            </Suspense> */}
            <h1 className="py-9 text-left text-[28px]">Featured Listings</h1>
            <Suspense fallback={<FeaturedListingsSkeleton />}>
              <FeaturedListingsSection />
            </Suspense>
          </div>
          <DiscoverSection />
          <Suspense fallback={<AllListingsSkeleton />}>
            <AllistingsSection />
          </Suspense>
          <BlogSection />
        </div>
      </div>
    </main>
  );
}
