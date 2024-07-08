"use client";

import { useState } from "react";
import type { ListingData } from "~/app/(application)/definitions";
import { IconGenerator } from "../common";

export default function Overview({ listing }: { listing: ListingData }) {
  const [readMore, setReadMore] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Overview</h1>
      <article
        className={`${readMore ? "line-clamp-none" : "line-clamp-6 "} pt-4 text-justify `}
      >
        {listing.description}
      </article>
      <button
        onClick={() => setReadMore(!readMore)}
        className="select-none text-center align-middle text-sm font-bold text-primary transition-all hover:text-sky-700"
      >
        {readMore ? "Read less" : "Read more"}
      </button>
      <article className="grid grid-cols-3 pt-10">
        {listing.amenities.map((amenitie, index) => {
          return (
            (!viewMore ? index < 9 : index >= 0) && (
              <div key={index} className="flex items-center gap-2">
                <IconGenerator
                  key={index}
                  src="/home-icon.svg"
                  width="20px"
                  alt="home icon"
                />
                <h6 className="font-medium">{amenitie}</h6>
              </div>
            )
          );
        })}
      </article>
      <button
        onClick={() => setViewMore(!viewMore)}
        className="mb-10 mt-1 flex select-none text-sm font-bold text-primary transition-all hover:text-sky-700"
      >
        {viewMore ? "View less" : "View more"}
      </button>
    </div>
  );
}
