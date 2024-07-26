import { Divider } from "@mui/material";
import type { ListingData } from "~/app/(application)/definitions";

export default function PolicyAndRules({ listing }: { listing: ListingData }) {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-5">
        <h5 className="text-2xl font-bold">Cancellation policy</h5>
        <p>{listing.cancellationPolicy}</p>
      </div>
      <Divider className="my-10" />
      <div className="flex flex-col gap-5">
        <h5 className="text-2xl font-bold">Ground roules</h5>
        <p>{listing.houseRules}</p>
      </div>
    </div>
  );
}