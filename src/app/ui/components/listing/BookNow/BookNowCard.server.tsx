import {
  getAvailabilityDates,
  getListingData,
} from "~/app/(application)/actions";
import BookNowContent from "./BookNowCard.client";
import type { IParams } from "~/app/(application)/definitions";
import dayjs from "dayjs";

const startDate = dayjs().format("YYYY-MM-DD");
const endDate = dayjs().add(12, "month").format("YYYY-MM-DD");
export default async function BookNow({ params }: { params: IParams }) {
  const listingInfo = (await getListingData(params))!;
  const availabilityDate =
    listingInfo.source === "Lodgix"
      ? await getAvailabilityDates(
          listingInfo.source,
          listingInfo.id,
          startDate,
          endDate,
        )
      : undefined;
  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <BookNowContent
        listingInfo={listingInfo}
        params={params}
        availableDates={availabilityDate}
      />
    </div>
  );
}
