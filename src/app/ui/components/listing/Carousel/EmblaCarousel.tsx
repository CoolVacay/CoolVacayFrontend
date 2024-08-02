"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Thumb } from "./EmblaCarouselThumbsButton";
import type { IListingData } from "~/app/(application)/definitions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SimilarCard } from "../../common";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

type CarouselType = {
  data: IListingData["images"] | IListingData[];
  slideNr: number;
  handleClick?: (url?: number | string) => void;
  type: "image" | "card";
};

const EmblaCarousel = ({ data, slideNr, handleClick, type }: CarouselType) => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    startIndex: 4,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollTo(slideNr - 1);
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect, slideNr]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <div className="embla">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-24">
          <div
            className={`grid ${type === "image" ? "col-span-2 desktop:col-span-4" : "col-span-1"}`}
          >
            <button aria-label="back arrow button" onClick={scrollPrev}>
              {type === "image" ? (
                <KeyboardArrowLeftIcon className="h-[70px] w-[70px] hover:text-primary" />
              ) : (
                <ArrowCircleLeftOutlinedIcon className="size-[46px]" />
              )}
            </button>
          </div>
          <div
            className={`grid ${type === "image" ? "col-span-20 desktop:col-span-16" : "col-span-22 ml-3"}`}
          >
            <div className="embla__viewport" ref={emblaMainRef}>
              <div className="embla__container">
                {type === "image"
                  ? (data as IListingData["images"]).map((image, index) => (
                      <div className="embla__slide" key={index + 1}>
                        <div className="embla__slide__number">
                          {
                            <Image
                              key={index + 1}
                              src={image.url}
                              alt={image.name}
                              placeholder="blur"
                              sizes="100vw"
                              width={640}
                              height={500}
                              quality={90}
                              blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                          }
                        </div>
                      </div>
                    ))
                  : (data as IListingData[]).map((listing, index) => {
                      return (
                        <Link
                          key={listing.id}
                          href={`/listing/${listing.source}/${listing.id}`}
                          className="h-[215px]"
                        >
                          <SimilarCard
                            key={index}
                            name={listing.name}
                            subtitle={`${listing.city}, ${listing.state}`}
                            imageUrl={listing.imageUrl}
                            numberOfGuests={listing.numberOfGuests}
                            bedrooms={listing.bedrooms}
                            bathrooms={listing.bathrooms}
                            price={listing.price}
                            className="snap-start"
                          />
                        </Link>
                      );
                    })}
              </div>
            </div>
          </div>
          <div
            className={`grid content-center justify-items-end ${type === "image" ? "col-span-2 desktop:col-span-4" : "col-span-1"}`}
          >
            <button aria-label="back arrow button" onClick={scrollNext}>
              {type === "image" ? (
                <KeyboardArrowRightIcon className="h-[70px] w-[70px] hover:text-primary" />
              ) : (
                <ArrowCircleRightOutlinedIcon className="size-[46px]" />
              )}
            </button>
          </div>
        </div>
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {type === "image" &&
                handleClick &&
                (data as IListingData["images"]).map((image, index) => (
                  <Thumb
                    key={index}
                    onClick={() => {
                      handleClick(index + 1);
                      onThumbClick(index);
                    }}
                    selected={index === selectedIndex}
                    image={image}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
