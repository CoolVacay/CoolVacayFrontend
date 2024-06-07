import Image from "next/image";
import type { ListingData } from "~/app/(application)/definitions";

export default function Gallery({ listing }: { listing: ListingData }) {
  return (
    <div className="relative grid w-full grid-cols-4 grid-rows-2 gap-5">
      {listing.images.map((image, index) => {
        if (index < 5) {
          return (
            <div
              key={index}
              className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} rounded-[8px]`}
            >
              <Image
                key={index}
                src={image.url}
                alt={image.name}
                sizes="100vw"
                width={640}
                height={500}
                quality={index > 0 ? 40 : 80}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          );
        }
      })}
      <button
        className="absolute bottom-4 right-3 rounded-full bg-white px-[14px] py-[11px] text-sm font-medium text-[#29ABE2]	"
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)" }}
      >
        Show all photos
      </button>
    </div>
  );
}
