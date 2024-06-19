import Image from "next/image";

export default function BookedListingCard({
  name,
  subtitle,
  imageUrl,
  className,
}: {
  name: string;
  subtitle: string;
  imageUrl?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[136px] w-full gap-6 rounded-xl border border-[#EAEAEF] p-3 ${className}`}
    >
      <div className="flex h-[112px] w-[138px]">
        <Image
          src={imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="CoolVacay listing image"
          style={{
            height: 112,
            width: "auto",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
      <div className="flex gap-16">
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Dates</div>
          <p className="text-sm text-[#676D73]">Feb 19, 2023 - Feb 24, 2023</p>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Guests</div>
          <p className="text-sm text-[#676D73]">1 guest</p>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <p className="text-sm text-[#676D73]">{name}</p>
        </div>
      </div>
    </div>
  );
}
