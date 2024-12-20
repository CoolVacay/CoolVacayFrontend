"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import { Thumb } from "./GalleryCarouselThumbsButton";
import type { IListingData } from "~/app/(application)/definitions";
import { SimilarCard } from "../../common";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

type CarouselType = {
  data: IListingData["images"] | IListingData[];
  type: "image" | "card";
};

const GalleryCarousel = ({ data, type }: CarouselType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
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
    emblaMainApi.scrollTo(selectedIndex);
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, selectedIndex, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
    setSelectedIndex(selectedIndex - 1);
  }, [emblaMainApi, selectedIndex]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
    setSelectedIndex(selectedIndex + 1);
  }, [emblaMainApi, selectedIndex]);

  return (
    <div
      className={`flex ${type === "image" ? "h-[calc(100vh_-_236px)]" : "h-full"} w-full`}
    >
      <div className="no-scrollbar flex h-full flex-col overflow-hidden sm:justify-between lg:items-center">
        <div className="flex shrink-0 grow-0 items-center">
          <div className="flex flex-nowrap items-center">
            <div
              className={`${type === "image" ? "hidden md:col-span-1 md:grid lg:col-span-2" : "hidden sm:block"}`}
            >
              <button aria-label="back arrow button" onClick={scrollPrev}>
                {type === "image" ? (
                  <KeyboardArrowLeftIcon className="hover:text-primary md:h-[50px] md:w-full lg:h-[70px] lg:w-[70px]" />
                ) : (
                  <ArrowCircleLeftOutlinedIcon className="hidden md:block md:size-[32px] lg:size-[42px]" />
                )}
              </button>
            </div>
            <div
              className={`grid ${type === "image" ? "col-span-24 md:col-span-22 lg:col-span-20" : "col-span-22 sm:ml-1"}`}
            >
              <div className="overflow-hidden" ref={emblaMainRef}>
                <div className="flex max-h-[600px] w-full shrink-0 touch-pan-y touch-pinch-zoom gap-5">
                  {type === "image"
                    ? (data as IListingData["images"]).map((image, index) => (
                        <div className="flex w-full shrink-0" key={index + 1}>
                          {
                            <Image
                              key={index + 1}
                              src={image.url}
                              alt={image.name}
                              priority={index < 4 ? true : false}
                              placeholder="blur"
                              width={1080}
                              height={720}
                              quality={65}
                              className="w-full md:rounded md:rounded-xl"
                              blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
                              style={{ objectFit: "cover" }}
                            />
                          }
                        </div>
                      ))
                    : (data as IListingData[]).map((listing, index) => {
                        return (
                          <Link
                            key={listing.id}
                            href={`/listing/${listing.source}/${listing.id}`}
                            className="h-[420px] md:h-[185px]"
                          >
                            <SimilarCard
                              key={index}
                              propertyName={listing.propertyName}
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
              className={`${type === "image" ? "hidden md:col-span-1 md:block lg:col-span-2" : "hidden sm:block"}`}
            >
              <button aria-label="front arrow button" onClick={scrollNext}>
                {type === "image" ? (
                  <KeyboardArrowRightIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
                ) : (
                  <ArrowCircleRightOutlinedIcon className="hidden md:block md:size-[32px] lg:size-[42px]" />
                )}
              </button>
            </div>
          </div>
        </div>
        {type === "image" ? (
          <div className="flex h-[50px] w-full items-center justify-center gap-5 md:hidden">
            <div className="flex items-center">
              <button aria-label="back arrow button" onClick={scrollPrev}>
                <KeyboardArrowLeftIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
              </button>
            </div>
            <p className="flex w-[100px] justify-center gap-5">{`${selectedIndex + 1} / ${data.length}`}</p>
            <div className="flex items-center">
              <button aria-label="forward arrow button" onClick={scrollNext}>
                <KeyboardArrowRightIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
              </button>
            </div>
          </div>
        ) : null}
        {type === "image" ? (
          <div className="embla-thumbs">
            <div className="overflow-hidden" ref={emblaThumbsRef}>
              <div className="-ml-3 flex h-[110px]">
                {(data as IListingData["images"]).map((image, index) => (
                  <Thumb
                    key={index}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    image={image}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GalleryCarousel;
