"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { RangeDatePicker, FormDialog, SelectInput } from "../../common";
import type { DateRangeType } from "../../home/SearchCard";
import type {
  IParams,
  IListingData,
  IPropertyAvailability,
} from "~/app/(application)/definitions";

export interface IPricingDetails {
  quoteId?: string;
  totalPrice: number;
  totalPriceStr: string;
  numberOfNights: number;
  confirmationAmount: number;
  confirmationAmountStr: string;
  pricePerNight: number;
  pricePerNightStr: string;
  components: {
    name: string;
    total: number;
    totalStr: string;
  }[];
}

export default function BookNowContent({
  listingInfo,
  params,
  availabilityData,
}: {
  listingInfo: IListingData;
  params: IParams;
  availabilityData?: IPropertyAvailability | undefined;
}) {
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();

  const availableDates = availabilityData?.availabilityArray
    .filter((item) => item.isAvailable)
    .map((item) => dayjs(item.date).format("YYYY-MM-DD"));

  const selectedDates = [
    searchParamsValues.fromDate,
    searchParamsValues.toDate,
  ];
  const bookButtonDisabled =
    !selectedDates[0] ||
    !selectedDates[1] ||
    !searchParamsValues.numberOfGuests;

  return (
    <div
      className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5`}
    >
      <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
        <div
          className="relative px-6 py-5"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <RangeDatePicker
            size="medium"
            availableDates={availableDates}
            selectedDates={selectedDates as DateRangeType}
            setDates={(values: DateRangeType | ["", ""]) =>
              updateSearchParams(["fromDate", "toDate"], values)
            }
            listingInfo={listingInfo}
          />
        </div>
        <div className="px-6 py-5">
          <SelectInput
            size="medium"
            value={searchParamsValues.numberOfGuests ?? "1"}
            onChange={(e: SelectChangeEvent<string>) =>
              updateSearchParams(["numberOfGuests"], [e.target.value])
            }
          />
        </div>
      </div>
      <button
        disabled={bookButtonDisabled}
        className={`h-[58px] disabled:opacity-50`}
      >
        <Link
          className={`flex w-full justify-center rounded-full bg-primary py-4 text-white ${!bookButtonDisabled ? "hover:border hover:border-primary hover:bg-white hover:text-primary" : "pointer-events-none"} disabled:opacity-50`}
          href={
            params.source === "Guesty"
              ? `/book/${params.source}/${params.id}/payment?${searchParams.toString()}`
              : `/book/${params.source}/${params.id}/billing-address?${searchParams.toString()}`
          }
        >
          Book now
        </Link>
      </button>
      <Divider />
      <FormDialog
        title="Inquire now"
        subtitle="Have a question or feedback? Fill out the form
            below, and we'll get back to you as soon as possible."
        data={listingInfo}
        content="inquiry"
      >
        <button className="w-full rounded-full border border-primary bg-white py-4 text-primary hover:bg-primary hover:text-white">
          Inquire now
        </button>
      </FormDialog>
    </div>
  );
}
