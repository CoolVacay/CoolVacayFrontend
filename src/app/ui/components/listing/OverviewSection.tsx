"use client";

import { useEffect, useRef, useState } from "react";
import type { IListingData } from "~/app/(application)/definitions";
import { HomeIcon } from "public/HomeIcon";

export default function Overview({ listing }: { listing: IListingData }) {
  const [readMore, setReadMore] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const visibleAmenities = viewMore
    ? listing.amenities
    : listing.amenities.slice(0, 9);

  useEffect(() => {
    if (articleRef.current) {
      // Check if the content overflows the container
      setIsClamped(
        articleRef.current.scrollHeight > articleRef.current.clientHeight,
      );
    }
  }, [listing.description]);

  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Overview</h1>
      <article
        ref={articleRef}
        className={`${
          readMore ? "line-clamp-none" : "line-clamp-6"
        } whitespace-pre-line pt-4 text-justify`}
      >
        {listing.description}
      </article>
      {isClamped && (
        <button
          onClick={() => setReadMore(!readMore)}
          className="mt-2 select-none text-sm font-bold text-primary transition-all hover:text-sky-700"
        >
          {readMore ? "Read less" : "Read more"}
        </button>
      )}
      <article className="grid grid-cols-2 pt-10 lg:grid-cols-3">
        {visibleAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <HomeIcon color="text-primary" />
            <h1 className="text-sm font-medium">{amenity}</h1>
          </div>
        ))}
      </article>

      {listing.amenities.length > 9 ? (
        <button
          onClick={() => setViewMore(!viewMore)}
          className="mb-10 mt-1 flex select-none text-sm font-bold text-primary transition-all hover:text-sky-700"
        >
          {viewMore ? "View less" : "View more"}
        </button>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  );
}
