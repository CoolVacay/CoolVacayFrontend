import Image from "next/image";
import Link from "next/link";
import { CustomChip } from "../common";

export function DiscoverSection() {
  return (
    <section className="flex grow-0 flex-col gap-12 py-14 lg:max-h-[680px] lg:shrink-0 lg:flex-row">
      <div className="hidden h-[460px] md:flex md:shrink-0 md:items-center md:justify-center">
        <Image
          src="/discover_photo.png"
          alt="Discover more destinations"
          width={0}
          height={0}
          sizes="100vw"
          quality={30}
          style={{
            objectFit: "cover",
            height: "460px",
            width: "492px",
          }}
          className="rounded-[30px]"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-3 xl:flex xl:grow-0">
        <div className="flex justify-center lg:justify-start">
          <CustomChip label="Discover" width={90} />
        </div>
        <h1 className="leading-80 text-center text-[32px] font-semibold sm:font-medium desktop:text-[46px] desktop:leading-[47px]">
          Explore vacation rentals with beach access
        </h1>
        <h2 className="font-500 text-md hidden leading-7 xl:block xl:text-base">
          Add to your vacation with amenities like direct beach access,
          oceanfront homes, pools, hot tubs, and pet-friendly stays.
        </h2>
        <h3 className="lg:text-md font-400 text-justify text-sm leading-6 text-[#020101]/[.60]">
          With every coast comes a unique way to relax by the ocean. Enjoy the
          East Coast’s bustling boardwalks in Myrtle Beach or historic New
          England lighthouses. Reel in a trophy catch on the Gulf Coast or bring
          the kids snorkeling along the Florida Keys. Out on the West Coast,
          embark on an adventure hiking the Oregon Coast’s rugged trails, island
          hop along the San Juan Islands, or laze beside the Southern California
          Coast’s laidback surf. Skip the same old stretch of sand and find a
          new favorite beach hideaway.
        </h3>
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/blog"
            className="flex w-40 items-center justify-center rounded-[48px] bg-primary px-6 py-4 text-white"
          >
            More details
          </Link>
        </div>
      </div>
    </section>
  );
}
