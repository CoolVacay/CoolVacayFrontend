import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { LocationPin } from "public/LocationPin";
import type { IHotDealData } from "~/app/(application)/definitions";

function HotDealsCard({ listing }: { listing: IHotDealData }) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-center lg:gap-6 lg:p-8">
      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-[30px] sm:h-[280px] md:h-[380px] md:w-[460px] lg:w-[492px]">
        <Image
          src={listing?.imageUrl ?? "/cardImage.png"}
          alt="Hot Deal Image"
          fill
          sizes="(max-width: 768px) 100vw, 460px"
          style={{ objectFit: "cover" }}
          className="rounded-[30px]"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
            {listing.propertyName && `${listing.propertyName}, `}
            {listing.listingName && `${listing.listingName}`}
          </h2>
          <div className="flex items-center text-sm sm:text-base">
            <LocationPin color="#29ABE2" />
            <span className="ml-1">{listing?.address}</span>
          </div>
          {/* If price exists in the hot deal, we show the crossed price and new price, otherwise we just show the discount percentage */}
          {!listing.price ? (
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold italic text-primary sm:text-base">
                Hot Deal Price:
              </p>
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white md:h-10 md:w-10 md:text-sm">
                    {listing?.discountPercentage}%
                  </div>
                  <div className="absolute left-6 bg-gray-200 py-1.5 pl-3 pr-4 text-xs font-bold text-gray-800 md:left-7 md:py-2 md:pl-4 md:pr-6 md:text-sm">
                    OFF
                  </div>
                  <div
                    className="absolute left-[70px] z-20 h-0 w-0 md:left-[88px]"
                    style={{
                      borderTop: "16px solid transparent",
                      borderBottom: "16px solid transparent",
                      borderRight: "8px solid #FFF",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-semibold italic text-primary">
                Hot Deal Price:
              </p>
              <div className="flex items-center gap-2">
                <span className="line-through">
                  $
                  {Math.round(
                    (listing.price * 100) / (100 - listing.discountPercentage),
                  )}
                </span>
                <span className="text-2xl font-bold">
                  ${listing.price}/night
                </span>
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-sm font-bold text-white">
                      {listing?.discountPercentage}%
                    </div>
                    <div className="absolute left-7 bg-gray-200 py-2 pl-4 pr-6  text-sm font-bold text-gray-800">
                      OFF
                    </div>
                    <div
                      className="absolute left-[88px] z-20 h-0 w-0"
                      style={{
                        borderTop: "20px solid transparent",
                        borderBottom: "20px solid transparent",
                        borderRight: "10px solid #FFF",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className="mt-2 line-clamp-5 text-sm md:max-w-[400px]">
            {listing?.listingDescription}
          </p>
        </div>
        <div className="mt-3 opacity-50">
          {dayjs(listing.fromDate).format("DD MMMM YYYY")} -{" "}
          {dayjs(listing.toDate).format("DD MMMM YYYY")}
        </div>
        <div>
          <Link
            href={`listing/${listing.source}/${listing.listingSourceId}?numberOfGuests=1`}
          >
            <button className="mt-4 w-full rounded-full border border-primary bg-primary px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-primary md:w-auto">
              BOOK NOW TO SAVE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotDealsCard;
