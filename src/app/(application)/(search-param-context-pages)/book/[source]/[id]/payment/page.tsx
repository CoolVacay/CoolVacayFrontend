import { getListingData } from "~/app/(application)/actions";
import PaymentForm from "./PaymentForm";
import { auth } from "~/auth";
import PolicyAndRules from "~/app/ui/components/listing/PolicyAndRules";

export default async function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const session = (await auth())!;
  const listing = (await getListingData(params))!;

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Payment</h1>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <PaymentForm params={params} userId={session?.user!.id} />
        <div className="pt-10">
          <PolicyAndRules listing={listing} />
        </div>
      </div>
    </div>
  );
}
