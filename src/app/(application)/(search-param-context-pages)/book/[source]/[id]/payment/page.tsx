import { getListingData } from "~/app/(application)/actions";
import RheaPaymentForm from "./RheaPaymentForm";
import { auth } from "~/auth";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";
import GuestyPaymentForm from "./GuestyPaymentForm";

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

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Payment</h1>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        {params.source === 'Guesty' ? <GuestyPaymentForm source={params.source} listingInfo={listing} fromDate={searchParams.fromDate} toDate={searchParams.toDate} numberOfGuests={searchParams.numberOfGuests} /> : 
          <RheaPaymentForm searchParams={searchParams} params={params} userId={session?.user!.id} />}
        <div className="pt-10">
          <PolicyAndRules listing={listing} />
        </div>
      </div>
    </div>
  );
}
