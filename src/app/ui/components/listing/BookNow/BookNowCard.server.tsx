import { getListingData } from "~/app/(application)/actions";
import BookNowContent from "./BookNowCard.client";

export default async function BookNow({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const listingInfo = (await getListingData(params))!;

  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <BookNowContent listingInfo={listingInfo} params={params} />
    </div>
  );
}
