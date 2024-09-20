import {
  BookItNowSkeleton,
  BreadcrumbSkeleton,
  GallerySkeleton,
  OverviewSkeleton,
} from "~/app/ui/components/common/Skeletons/ListingSkeletons";

export default function Loading() {
  return (
    <main className="flex flex-col items-center px-4 lg:px-0">
      <div className="custom-max-widths items-center justify-center">
        <div className="flex max-w-[1220px] flex-col items-center">
          <div className="w-full">
            <BreadcrumbSkeleton />
            <div className="mb-6 flex w-full flex-col justify-between gap-2">
              <div className="mt-3 h-8 w-[340px] bg-gray-100 sm:h-9 md:w-[650px]" />
              <div className="mt-3 h-8 w-full bg-gray-100 sm:h-9 md:hidden" />
            </div>
            <GallerySkeleton />
            <div className="my-10 flex flex-col gap-6 md:flex-row">
              <div className="w-full md:w-2/3">
                <OverviewSkeleton />
              </div>
              <div className="flex shrink-0 sm:w-[420px]">
                <BookItNowSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
