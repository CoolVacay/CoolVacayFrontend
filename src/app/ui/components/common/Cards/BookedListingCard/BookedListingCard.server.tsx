import Image from "next/image";
import { getListingData } from "~/app/(application)/actions";
import { Content } from "./BookedListingCard.client";

export default async function BookedListingCard({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const listing = (await getListingData(params))!;

  return (
    <div
      className={`flex items-center w-full gap-6 rounded-xl border border-[#EAEAEF] p-3`}
    >
      <div className="flex h-[112px] w-[138px]">
        <Image
          src={listing?.imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="Property image"
          style={{
            height: 112,
            width: "auto",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
      <Content listing={listing} />
    </div>
  );
}
