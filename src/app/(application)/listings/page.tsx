import { Suspense } from "react";
import { FilteredListingsSkeleton } from "~/app/ui/components/common/Skeletons/Skeletons";
import { ListingSection } from "~/app/ui/components/listings/ListingsSection";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query ?? "";
    return (
        <main className="w-7/12 pl-[70px]">
            <div className="flex place-items-baseline gap-8 pb-6">
                <h1 className="text-3xl">North Carolina available properties</h1>
                <h6 className="text-sm text-primary-grey300">4 properties</h6>
            </div>
            <Suspense fallback={<FilteredListingsSkeleton />}>
                <ListingSection query={query} />
            </Suspense>
        </main>
    );
}
