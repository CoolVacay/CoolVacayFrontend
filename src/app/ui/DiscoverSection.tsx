import React from "react";
import Image from "next/image";

function DiscoverSection() {
  return (
    <section className="flex gap-12 py-14 grow-0 shrink-0 max-h-[680px]">
      <Image
        src="/discover_photo.png"
        alt="Discover more destinations"
        width={592}
        height={580}
        quality={90}
        style={{ height: '560px' }}
        className="rounded-[30px]"
      />
      <div className="flex flex-col gap-3 grow-0 justify-center">
        <div className="flex h-[44px] w-[90px] shrink-0 justify-center rounded-[64px] bg-[#29ABE2]/[.10] p-3 text-sm text-primary">
          Discover
        </div>
        <h1 className="font-500 desktop:text-[56px] desktop:leading-[67px] leading-10 text-[42px]">
          Explore vacation rentals with beach access
        </h1>
        <h4 className="font-500 desktop:text-lg text-md leading-7">
          Add to your vacation with amenities like direct beach access,
          oceanfront homes, pools, hot tubs, and pet-friendly stays.
        </h4>
        <h4 className="desktop:text-md text-sm font-400 leading-6 text-[#020101]/[.60]">
          With every coast comes a unique way to relax by the ocean. Enjoy the
          East Coast’s bustling boardwalks in Myrtle Beach or historic New
          England lighthouses. Reel in a trophy catch on the Gulf Coast or bring
          the kids snorkeling along the Florida Keys. Out on the West Coast,
          embark on an adventure hiking the Oregon Coast’s rugged trails, island
          hop along the San Juan Islands, or laze beside the Southern California
          Coast’s laidback surf. Skip the same old stretch of sand and find a
          new favorite beach hideaway.
        </h4>
        <button className="rounded-[48px] w-40 px-6 py-4 bg-primary text-white">More details</button>
      </div>
    </section>
  );
}

export default DiscoverSection;
