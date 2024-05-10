export function CardSkeleton() {
    return (
        <div
            className={`h-[340px] w-[290px] grow-0 animate-pulse overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        >
            <div className="flex h-[210px] items-center justify-center truncate rounded-xl bg-white px-16 py-8" />
            <div className="flex flex-col">
                <div className="my-4 mx-2 flex h-14 grow rounded-md bg-gray-200" />
                <div className="flex gap-4">
                    <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
                    <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
                </div>
            </div>
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
