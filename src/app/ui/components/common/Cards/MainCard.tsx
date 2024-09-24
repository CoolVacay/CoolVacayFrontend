"use client";
import Image from "next/image";
import type { TMainCardProps } from "~/app/(application)/definitions";
import { CabinIcon } from "public/CabinIcon";
import { SquareFootIcon } from "public/SquareFootIcon";

export default function MainCard({
  isBlogCard,
  name,
  subtitle,
  imageUrl,
  propertyType,
  squareFeets,
}: TMainCardProps) {
  return (
    <div
      className={`${!isBlogCard && "shadow-cardShadow"} flex h-full grow-0 flex-col overflow-hidden rounded-xl max-[1280px]:w-[260px] max-[1150px]:w-[240px] max-[1070px]:w-[280px] xl:w-[280px]`}
      style={{
        border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
      }}
    >
      <div className="flex h-[210px] w-[278px]">
        <Image
          src={imageUrl ?? "/cardImage.png"}
          width={278}
          height={210}
          alt="CoolVacay listing image"
          className="h-[210px] w-auto"
          style={{
            width: isBlogCard ? "278px" : "auto",
            objectFit: "cover",
            borderRadius: isBlogCard ? 10 : 0,
          }}
        />
      </div>
      <div
        className={`${!isBlogCard && "px-2"} flex grow flex-col justify-between`}
      >
        <div className="pb-3 pt-2">
          <div className="mb-1 text-base font-medium">{name}</div>
          <p className="text-sm text-[#676D73]">{subtitle}</p>
        </div>
        {!isBlogCard && (
          <div className="flex gap-4 pb-4">
            <div className="flex gap-2">
              <CabinIcon color="text-primary"/>
              <p className="text-sm">{propertyType ?? "House"}</p>
            </div>
            {squareFeets ? (
              <div className="flex gap-2">
                <SquareFootIcon color="text-primary" />
                <p className="text-sm">{`${Math.floor(squareFeets ?? 0)} sqft`}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
