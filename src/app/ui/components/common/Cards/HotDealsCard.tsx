import type { IListingData } from "~/app/(application)/definitions";
import Image from "next/image";
import { LocationPin } from "public/LocationPin";
import ErrorIcon from "@mui/icons-material/Error";
// import Link from "next/link";

function HotDealsCard({ listing }: { listing?: IListingData }) {
  return (
    <div
      className={`flex h-min w-full gap-6 rounded-xl p-3 sm:flex-col md:flex md:w-full md:flex-row md:items-center`}
    >
      <div className="flex h-[186px] w-full lg:h-[280px] lg:w-[420px]">
        <Image
          src={listing?.imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="Property image"
          className="h-[186px] w-full rounded-2xl lg:h-[280px]"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="md:w-1/2">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">Caloosa Cove</div>
          <div className="flex items-center">
            <LocationPin color="#29ABE2" />
            <div className="ml-1 text-sm">
              73801 Overseas Hwy, Islamorada, FL 33036
            </div>
          </div>
          <div>
            <p className="font-semibold italic text-primary">Hot Deal Price:</p>
            <div className="flex items-center gap-2">
              <span className="line-through">$259</span>
              <span className="text-2xl font-bold">$219/night</span>
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-sm font-bold text-white">
                    30%
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
          <p className="mt-2 text-sm">
            Escape to paradise at Caloosa Cove Resort & Marina in beautiful
            Islamorada, spanning 15 lush acres. Our spacious Den Suites
            accommodate up to 6 guests.
          </p>
          <div className="mt-2 flex max-w-max items-center rounded-full bg-gray-100 p-2 text-sm">
            <ErrorIcon className="text-red-600" />
            <span className="ml-1">Only 1 Room Left at this Price</span>
          </div>

          {/* Book Now Button */}
          {/* <Link href={`listing/${source}/${id}?${searchParams.toString()}`}> */}
          <button className="max-w-max rounded-full border border-primary bg-primary px-6 py-3 font-bold text-white hover:bg-white hover:text-primary">
            BOOK NOW TO SAVE
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default HotDealsCard;
