import type { ListingData } from "~/app/(application)/definitions";
import type { IPricingDetails } from "./BookNowCard.client";

export function PricingDetails({
  listing,
  pricingDetails,
  nights,
}: {
  listing: ListingData | undefined;
  pricingDetails: IPricingDetails | undefined;
  nights: number;
}) {
  return (
    <div className="flex flex-col gap-4 font-medium">
      <h6 className="flex justify-between text-lg text-[#858C93]">
        ${listing?.price} x {nights} nights
        <span className="text-black">
          ${pricingDetails?.components[0]?.total}
        </span>
      </h6>

      {pricingDetails?.components.map((fee, index) => {
        if (index > 0) {
          return (
            <h6
              key={index}
              className="flex justify-between text-lg text-[#858C93]"
            >
              {fee.name}
              <span className="text-black">${fee.total}</span>
            </h6>
          );
        } else {
          return null;
        }
      })}
      <h5 className="flex justify-between text-2xl">
        Total
        <span>${pricingDetails?.totalPrice}</span>
      </h5>
    </div>
  );
}
