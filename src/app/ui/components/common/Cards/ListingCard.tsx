"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { IconGenerator } from "../IconGenerator";
import type { ListingCardProps } from "~/app/(application)/definitions";
import { truncateText, formatDateMMMDD } from "../../../../utils/helpers";

export default function ListingCard({
  id,
  source,
  name,
  subtitle,
  imageUrl,
  price,
  closeDates,
}: ListingCardProps) {
  const { searchParamsValues, searchParams } = useAppSearchParams();
  const startDate = searchParamsValues.fromDate?.format("MMM DD");
  const endDate = searchParamsValues.toDate?.format("MMM DD");

  searchParams.delete("pageNum");
  return (
    <div
      className={`flex h-[${closeDates ? "440px" : "405px"}] w-[280px] lg:w-[360px] grow-0 flex-col gap-4 overflow-hidden rounded-md p-1`}
    >
      <div className="relative">
        <Link
          href={`listing/${source}/${id}?${searchParams.toString()}`}
          className="w-min"
        >
          <Image
            src={imageUrl ?? "/listing_card.png"}
            width={360}
            height={240}
            alt="CoolVacay listing image"
            style={{
              height: 210,
              objectFit: "fill",
              borderRadius: 6,
            }}
          />
        </Link>
      </div>
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-1">
          {!closeDates ? (
            <div className="flex items-center justify-between font-medium">
              <h2 className="text-lg">
                ${price}
                <span className="text-sm text-primary-grey400"> night</span>
              </h2>
              {startDate && endDate ? (
                <h2 className="text-sm text-primary-grey400">
                  {startDate} - {endDate}
                </h2>
              ) : null}
            </div>
          ) : null}
          <div>
            <div className="mb-1 text-base font-medium">
              {truncateText(name, 40)}
            </div>
            <p className="text-sm text-[#676D73]">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <IconGenerator
              src="/rating_star.svg"
              alt="Rating start"
              width="16px"
              height={16}
            />
            <h2 className="text-sm">
              4.5
              <span className="text-sm font-medium text-primary-grey400">
                {" "}
                (293 review)
              </span>
            </h2>
          </div>
        </div>
        {closeDates ? (
          <div className="mt-4 flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xs text-[#FF6565]">
              <IconGenerator src="/notice.svg" alt="Notice icon" width="12px" />
              This property has no availability from {startDate} to {endDate}
            </p>
            <div className="flex max-w-max flex-col items-center gap-2 rounded-lg border border-[#ADB5BD] p-3">
              <p className="font-medium text-primary">
                {formatDateMMMDD(closeDates[0])} -
                {formatDateMMMDD(closeDates[1])}
              </p>
              <p className="text-sm text-[#858C93]">
                {dayjs(closeDates[1]).diff(dayjs(closeDates[0]), "day")} nights
              </p>
            </div>
          </div>
        ) : (
          <Link href={`listing/${source}/${id}?${searchParams.toString()}`}>
            <button className="w-full rounded-full border border-primary py-3 font-bold text-primary hover:bg-primary hover:text-white">
              Book
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
