import Image from "next/image";
import Link from "next/link";
import ErrorIcon from "@mui/icons-material/Error";

import { LocationPin } from "public/LocationPin";
import type { IHotDealData } from "~/app/(application)/definitions";

function HotDealsCard({ listing }: { listing: IHotDealData }) {
  return (
    <div className="flex grow-0 flex-col gap-4 sm:py-8 md:flex-row lg:max-h-[680px] lg:shrink-0 lg:gap-6">
      <div className="h-[280px] w-full overflow-hidden rounded-[30px] sm:flex sm:h-auto sm:w-full sm:shrink-0 md:w-[460px]">
        <Image
          src={listing?.imageUrl ?? "/cardImage.png"}
          alt="Discover more destinations"
          width={0}
          height={0}
          sizes={"60vw"}
          style={{ objectFit: "cover" }}
          className="flex h-[280px] w-full rounded-[30px] sm:h-full sm:w-full md:w-[492px]"
        />
      </div>
      <div className="md:w-1/2">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">Caloosa Cove</div>
          <div className="flex items-center">
            <LocationPin color="#29ABE2" />
            <div className="ml-1 text-sm">{listing?.address}</div>
          </div>
          <div>
            <p className="font-semibold italic text-primary">Hot Deal Price:</p>
            <div className="flex items-center gap-2">
              <span className="line-through">
                $
                {Math.round(
                  (listing.price * 100) / (100 - listing.discountPercentage),
                )}
              </span>
              <span className="text-2xl font-bold">${listing.price}/night</span>
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
          <p className="mt-2 line-clamp-5 text-sm md:max-w-[400px]">
            {listing?.listingDescription}
          </p>
          <div className="mt-2 flex max-w-max items-center rounded-full bg-gray-100 p-2 text-sm">
            <ErrorIcon className="text-red-600" />
            <span className="ml-1">Only 1 Room Left at this Price</span>
          </div>
          <Link
            href={`listing/${listing.source}/${listing.id}?&numberOfGuests=1`}
          >
            <button className="mt-2 max-w-max rounded-full border border-primary bg-primary px-6 py-3 font-bold text-white hover:bg-white hover:text-primary">
              BOOK NOW TO SAVE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotDealsCard;
