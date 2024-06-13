import { Divider } from "@mui/material";

import RangeDatePicker from "../common/RangeDatePicker";
import SelectInput from "../common/SelectInput";
import type { ListingData } from "~/app/(application)/definitions";
import FormDialog from "../common/Dialogs/FormDialog";

export default function BookNow({ listing }: { listing: ListingData }) {
  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <div className="flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5">
        <div className="flex justify-between">
          <h6>Choose your preferred day</h6>
          <h6 className="font-medium text-primary">View calendar</h6>
        </div>
        <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
          <div
            className="relative px-6 py-5"
            style={{ borderBottom: "1px solid #EAEAEF" }}
          >
            <RangeDatePicker size="small" />
          </div>
          <div className="px-6 py-5">
            <SelectInput size="small" />
          </div>
        </div>
        <button className=" h-[58px] w-full rounded-full bg-primary py-4 text-white hover:border hover:border-primary hover:bg-white hover:text-primary">
          Book now
        </button>
        <Divider />
        <FormDialog
          title="Enquire now"
          subtitle="Have a question or feedback? Fill out the form
below, and we'll get back to you as soon as possible."
          listing={listing}
        >
          <button className="w-full rounded-full border border-primary bg-white py-4 text-primary hover:bg-primary hover:text-white">
            Enquire now
          </button>
        </FormDialog>
        <h6 className="text-justify font-normal	text-[#858C93]">
          By proceeding, you consent to receive calls and texts at the number
          you provided, including marketing by autodialer and prerecorded and
          artificial voice, and email, from realtor.com and about your inquiry
          and other home-related matters, but not as a condition of any
          purchase. You also agree to our Terms of Use, and to our Privacy
          Policy regarding the information relating to you. Msg/data rates may
          apply. This consent applies even if you are on a corporate, state or
          national Do Not Call list.
        </h6>
      </div>
    </div>
  );
}
