import Link from "next/link";
import { IconGenerator } from "../common";
import { getCategories } from "~/app/(application)/actions";
import { BeachIcon } from "public/BeachIcon";
import { BeachfrontIcon } from "public/BeachfrontIcon";
import { BoatDocksIcon } from "public/BoatDocksIcon";
import { PoolIcon } from "public/PoolIcon";
import { SkiingIcon } from "public/SkiingIcon";
import { MountainIcon } from "public/MountainIcon";
import { WaterfrontIcon } from "public/WaterfrontIcon";

const IconMap = {
  Beach: <BeachIcon color="text-primary" />,
  Beachfront: <BeachfrontIcon color="text-primary" />,
  "Boat Docks": <BoatDocksIcon color="text-primary" />,
  Pool: <PoolIcon color="text-primary" />,
  Skiing: <SkiingIcon color="text-primary" />,
  Mountain: <MountainIcon color="text-primary" />,
  Waterfront: <WaterfrontIcon color="text-primary" />,
};

export async function PopularCategories() {
  const popularCategories = await getCategories();

  if (!popularCategories) {
    return <div>No Popular Categories</div>;
  }

  return (
    <div className={`no-scrollbar flex gap-5 ${popularCategories.length < 5 ? 'justify-start !gap-20' : 'justify-between md:gap-0'} overflow-auto will-change-scroll `}>
      {popularCategories.map((category) => (
        <div
          key={category.name}
          className="flex shrink-0 flex-col items-center"
        >
          {/* Large screen view */}
          <button
            className={`hidden rounded-full bg-[#F7F7F7] p-2 text-sm lg:flex lg:p-3 lg:text-sm xl:p-4 xl:text-base`}
          >
            <Link href={category.page} className="flex items-center">
              <span className="mr-2 flex lg:mr-4">
                {/* @ts-expect-error asf */}
                {IconMap[category.name]}
              </span>
              {category.name}
            </Link>
          </button>

          {/* Small screen view */}
          <div className="flex snap-start flex-col items-center gap-x-4 sm:mt-0 lg:hidden">
            <Link
              href={category.page}
              className="flex shrink-0 scroll-mr-2 flex-col items-center"
            >
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7] p-3">
                <span className="flex">
                  {/* @ts-expect-error asf */}
                  {IconMap[category.name]}
                </span>
              </button>
              <p className="mt-2 flex shrink-0 text-center text-sm">
                {category.name}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
