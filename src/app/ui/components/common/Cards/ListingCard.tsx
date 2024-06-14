import Image from "next/image";
import Link from "next/link";
import { IconGenerator } from "../IconGenerator";
import type { ListingCardProps } from "~/app/(application)/definitions";

export default function ListingCard({
  id,
  source,
  name,
  subtitle,
  imageUrl,
  price,
}: ListingCardProps) {
  return (
    <div className="flex h-[405px] w-[360px] grow-0 flex-col gap-4 overflow-hidden rounded-md p-1">
      <div className="relative">
        <Link href={`listing/${source}/${id}`} className="w-min">
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
          <IconGenerator
            src="/ri_heart-line.svg"
            alt="like button"
            width="24px"
            className="absolute right-2 top-2"
          />
        </Link>
      </div>
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-medium">
            <h6 className="text-lg">
              ${price}
              <span className="text-sm text-primary-grey400"> night</span>
            </h6>
            <h6 className="text-sm text-primary-grey400">Feb 19 - 26</h6>
          </div>
          <div>
            <div className="mb-1 text-base font-medium">{name}</div>
            <p className="text-sm text-[#676D73]">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <IconGenerator
              src="/rating_star.svg"
              alt="Rating start"
              width="16px"
              height={16}
            />
            <h6 className="text-sm">
              4.5
              <span className="text-sm font-medium text-primary-grey400">
                {" "}
                (293 review)
              </span>
            </h6>
          </div>
        </div>
        <Link href={`listing/${source}/${id}`}>
          <button className="w-full rounded-full border border-primary py-3 font-bold text-primary hover:bg-primary hover:text-white">
            Book
          </button>
        </Link>
      </div>
    </div>
  );
}
