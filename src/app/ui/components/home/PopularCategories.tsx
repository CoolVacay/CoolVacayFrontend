import Link from "next/link";
import { IconGenerator } from "../common";
import { getCategories } from "~/app/(application)/actions";

export async function PopularCategories() {
  const popularCategories = await getCategories();

  if (!popularCategories) {
    return <div>No Popular Categories</div>;
  }

  return (
    <div className="flex flex-wrap px-2 gap-5 sm:flex-nowrap sm:justify-between sm:gap-y-4 sm:overflow-auto sm:will-change-scroll">
      {popularCategories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          {/* Large screen view */}
          <button
            className={`hidden rounded-full bg-[#F7F7F7] p-2 text-sm sm:flex sm:p-3 sm:text-sm lg:p-4 lg:text-base`}
          >
            <Link href={category.page} className="flex items-center">
              <span className="mr-2 flex lg:mr-4">
                <IconGenerator
                  src={category.iconUrl}
                  width={category.width}
                  alt={category.alt}
                />
              </span>
              {category.name}
            </Link>
          </button>

          {/* Small screen view */}
          <div className="mt-6 flex snap-start flex-col items-center gap-x-4 sm:hidden">
            <Link href={category.page} className="flex flex-col items-center">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7] p-3">
                <span className="flex">
                  <IconGenerator
                    src={category.iconUrl}
                    width={category.width}
                    alt={category.alt}
                  />
                </span>
              </button>
              <p className="text-center text-xs mt-2">{category.name}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
