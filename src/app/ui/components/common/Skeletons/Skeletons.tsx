export function CardSkeleton() {
  return (
    <div
      className={`h-[340px] w-[290px] grow-0 animate-pulse overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex h-[210px] items-center justify-center truncate rounded-xl bg-white px-16 py-8" />
      <div className="flex flex-col">
        <div className="mx-2 my-4 flex h-14 grow rounded-md bg-gray-200" />
        <div className="flex gap-4">
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>
    </div>
  );
}

export function FilteredListingSkeleton() {
  return (
    <div className="flex h-[400px] w-[350px] animate-pulse flex-col justify-between">
      <div
        className={`h-[340px] w-[350px] grow-0  overflow-hidden rounded-xl bg-gray-100 p-1 shadow-sm`}
      >
        <div className="flex h-[210px] items-center justify-center truncate rounded-xl bg-white px-16 py-8" />
        <div className="flex flex-col">
          <div className="mt-3 flex justify-between">
            <div className="m-1 h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
            <div className="m-1 h-4 w-24 rounded-md bg-gray-200 text-sm font-medium" />
          </div>
          <div className="mx-1 my-1 flex h-[72px] grow rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
    </div>
  );
}

export function FeaturedListingsSkeleton() {
  return (
    <section className="block pb-10">
      <div className="flex justify-evenly gap-4">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((skeleton) => {
          return <CardSkeleton key={skeleton} />;
        })}
      </div>
    </section>
  );
}

export function AllListingsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => i + 1).map((skeleton) => {
        return <CardSkeleton key={skeleton} />;
      })}
    </div>
  );
}

export function FilteredListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 desktop:grid-cols-2">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((skeleton) => {
        return <FilteredListingSkeleton key={skeleton} />;
      })}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="sticky right-0 top-0 h-screen w-7/12 bg-gray-100 desktop:w-5/12" />
  );
}

export function PopularCategoriesSkeleton() {
  return (
    <div className="flex flex-wrap md:justify-between">
      {Array.from({ length: 7 }, (_, i) => i + 1).map((skeleton, index) => {
        return (
          <div
            key={skeleton}
            className={`${index > 0 && "ml-10"} flex w-32 shrink-0 grow-0 animate-pulse rounded-full bg-gray-100 p-6 shadow-sm`}
          />
        );
      })}
    </div>
  );
}

export function BookedListingCardSkeleton() {
  return (
    <div
      className={`flex h-[136px] w-full animate-pulse gap-6 rounded-xl border border-[#EAEAEF] p-3`}
    >
      <div className="flex h-[112px] w-[138px] rounded-lg bg-gray-100" />
      <div className="flex gap-16">
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Dates</div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-[74px] rounded bg-gray-100" /> -
            <div className="h-4 w-[74px] rounded bg-gray-100" />
          </div>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Guests</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
