import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HotDealsCard } from "~/app/ui/components/common";
import { AllListingsSection } from "~/app/ui/components/home";
import { getHotDeals } from "../actions";
import {
  AllListingsSkeleton,
  Newsletter,
  IconGenerator,
} from "~/app/ui/components/common";

export default async function Page({}) {
  const hotDeals = (await getHotDeals())!;

  return (
    <main className="flex flex-col">
      <div className={`relative -mt-24 flex h-[400px]`}>
        <div className={`absolute flex h-[400px] w-full`}>
          <Image
            alt="Hot deals picture"
            src="/accessibility-statement.jpeg"
            quality={90}
            fill
            priority={true}
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(80%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="my-5 flex justify-center sm:my-16">
        <div className="custom-max-widths items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-32 text-white md:top-44">
              <div className="flex w-full justify-center">
                <div className="w-full text-center">
                  <h1 className="text-center text-6xl font-bold leading-[80px] tracking-tight md:text-[80px]">
                    Hot Deals!
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-3 text-justify sm:gap-8 sm:p-0">
            {hotDeals.map((deal) => (
              <HotDealsCard key={deal.id} listing={deal} />
            ))}
            <section className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="main-title">All Listings</h2>
                <Link
                  href="/listings"
                  className="flex items-center text-primary"
                >
                  See all listings
                  <span className="ml-2">
                    <IconGenerator
                      src="/link.svg"
                      width="13px"
                      alt="link icon"
                    />
                  </span>
                </Link>
              </div>
              <Suspense fallback={<AllListingsSkeleton />}>
                <AllListingsSection page={1} />
              </Suspense>
              <Newsletter className="my-6 sm:my-8" />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
