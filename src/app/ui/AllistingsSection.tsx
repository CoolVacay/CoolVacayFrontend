import Link from "next/link";
import React from "react";
import IconGenerator from "./components/common/IconGenerator";
import MainCard from "./components/MainCard/MainCard";
import Newsletter from "./components/common/Newsletter/Newsletter";

function AllistingsSection() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[28px]">All listings</h4>
        <Link href="/listings" className="flex items-center text-primary">
          See all listings
          <span className="ml-2">
            {<IconGenerator src="/link.svg" width="13px" alt="link icon" />}
          </span>
        </Link>
      </div>
      <div className="grid desktop:grid-cols-4 grid-cols-3 gap-5 py-10">
        {Array.from({ length: 8 }, (_, i) => i + 1).map(card => {
          return <MainCard src="/cardImage.png" title="Swiss Mountain Village" subtitle="Blowing Rock, North Carolina" key={card} imgHeight={240} />
        })}
      </div>
      <div>
        <Newsletter />
      </div>
      <div className="grid desktop:grid-cols-4 grid-cols-3 gap-5 py-10">
        {Array.from({ length: 8 }, (_, i) => i + 1).map(card => {
          return <MainCard src="/cardImage.png" title="Swiss Mountain Village" subtitle="Blowing Rock, North Carolina" key={card} imgHeight={240} />
        })}
      </div>
    </div>
  );
}

export default AllistingsSection;
