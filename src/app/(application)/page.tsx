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

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <div className="flex justify-center">
        <div className="flex max-w-[1072px] flex-col items-center justify-center">
          <div className="w-max">
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
