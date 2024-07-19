import type { IParams } from "~/app/(application)/definitions";
import PricingDetailsCardContent from "./PricingDetails.client";

export default async function PricingDetailsCard({
  params,
}: {
  params: IParams;
}) {
  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <PricingDetailsCardContent params={params} />
    </div>
  );
}
