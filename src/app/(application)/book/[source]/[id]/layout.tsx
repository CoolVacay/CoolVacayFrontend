import BookedListingCard from "~/app/ui/components/common/Cards/BookedListingCard";
import { Breadcrumbs } from "~/app/ui/components/common";
import BookNow from "~/app/ui/components/listing/BookNowSection";

export default function Layout({
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
          <div className="flex w-full flex-col gap-3">
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
                  <h3 className="text-2xl font-bold">Reserve Information</h3>
                  <BookedListingCard
                    name="2BR Cabin"
                    subtitle="Hello"
                    // imageUrl="noImage"
                  />
                </div>

                {children}
              </div>
              <div className="flex shrink-0 flex-col gap-4">
                <BookNow params={params} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
