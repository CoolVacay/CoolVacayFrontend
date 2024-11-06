import { getListingData } from "~/app/(application)/actions";
import RheaPaymentForm from "./RheaPaymentForm";
import { auth } from "~/auth";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";
import GuestyPaymentForm from "./GuestyPaymentForm";
import { getPricingDetails } from "~/app/(application)/actions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Collection Step | Payment Process",
  description: "Payment Collection Step | Payment Process",
};
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    numberOfGuests: string;
    fromDate: string;
    toDate: string;
  };
}) {
  const session = (await auth())!;
  const listing = (await getListingData(params))!;
  const bookingDetails = (await getPricingDetails(
    params.source,
    listing.id,
    searchParams.fromDate,
    searchParams.toDate,
    searchParams.numberOfGuests,
  ))!;
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Payment</h1>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        {params.source === "Guesty" ? (
          <GuestyPaymentForm
            source={params.source}
            listingInfo={listing}
            bookingDetails={bookingDetails}
            successRedirectUrl={`book/${params.source}/${listing.id}/reservation-successful?numberOfGuests=${searchParams.numberOfGuests}&fromDate=${searchParams.fromDate}&toDate=${searchParams.toDate}`}
          />
        ) : (
          <RheaPaymentForm
            searchParams={searchParams}
            params={params}
            userId={session?.user!.id}
          />
        )}
        <div className="pt-10">
          <PolicyAndRules listing={listing} />
        </div>
      </div>
    </div>
  );
}
