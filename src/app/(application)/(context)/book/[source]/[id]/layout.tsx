import BookedListingCard from "~/app/ui/components/common/Cards/BookedListingCard/BookedListingCard.server";
import { Breadcrumbs } from "~/app/ui/components/common";
import { FormProvider } from "./FormContext";
import { Suspense } from "react";
import { BookedListingCardSkeleton } from "~/app/ui/components/common";
import { PricingDetailsCardSkeleton } from "~/app/ui/components/common/Skeletons/ListingSkeletons";
import PricingDetailsCard from "~/app/ui/components/listing/PricingDetailsCard/PricingDetails.server";
//TODO: add a loading page
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    source: string;
    id: string;
  };
}) {
  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] grow flex-col items-center">
          <div className="mb-12 flex w-full flex-col gap-3">
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: "Booking",
                  href: `/listing/${params.source}/${params.id}`,
                },
                {
                  label: "Payment",
                  href: `/book/${params.source}/${params.id}/billing-address`,
                  active: true,
                },
              ]}
            />
            <div className="flex gap-5">
              <div className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">Reserve Information</h1>
                  <Suspense fallback={<BookedListingCardSkeleton />}>
                    <BookedListingCard params={params} />
                  </Suspense>
                </div>
                <FormProvider>{children}</FormProvider>
              </div>
              <div className="flex shrink-0 flex-col gap-4">
                <Suspense fallback={<PricingDetailsCardSkeleton />}>
                  <PricingDetailsCard params={params} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
