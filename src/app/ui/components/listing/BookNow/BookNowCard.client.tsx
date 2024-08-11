"use client";

import Link from "next/link";
import { Divider } from "@mui/material";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { RangeDatePicker, FormDialog, SelectInput } from "../../common";
import type { SelectChangeEvent } from "@mui/material";
import type { DateRangeType } from "../../home/SearchCard";
import type { IParams, IListingData } from "~/app/(application)/definitions";
import type { IPropertyAvailability } from "~/app/(application)/definitions";
export interface IPricingDetails {
  totalPrice: number;
  totalPriceStr: string;
  numberOfNights: number;
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
  availableDates,
}: {
  listingInfo: IListingData;
  params: IParams;
  availableDates?: IPropertyAvailability | undefined;
}) {
  const { searchParams, searchParamsValues, updateSearchParams } =
    useAppSearchParams();

  const dates = [searchParamsValues.fromDate, searchParamsValues.toDate];

  return (
    <div
      className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5`}
    >
      <div className="flex-col rounded-[11px] border border-[#EAEAEF] hidden lg:block">
        <div
          className="relative px-6 py-5"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <RangeDatePicker
            size="medium"
            availableDates={availableDates}
            dates={dates as DateRangeType}
            setDates={(values: DateRangeType) =>
              updateSearchParams(["fromDate", "toDate"], values)
            }
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
      <div className="flex-col rounded-[11px] border border-[#EAEAEF] block lg:hidden">
        <div
          className="relative px-6 py-5"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <RangeDatePicker
            size="small"
            availableDates={availableDates}
            dates={dates as DateRangeType}
            setDates={(values: DateRangeType) =>
              updateSearchParams(["fromDate", "toDate"], values)
            }
          />
        </div>
        <div className="px-6 py-5">
          <SelectInput
            size="small"
            value={searchParamsValues.numberOfGuests ?? "1"}
            onChange={(e: SelectChangeEvent<string>) =>
              updateSearchParams(["numberOfGuests"], [e.target.value])
            }
          />
        </div>
      </div>
      <Link
        href={`/book/${params.source}/${params.id}/billing-address?${searchParams.toString()}`}
        className="flex h-[58px] w-full justify-center rounded-full bg-primary py-4 text-white hover:border hover:border-primary hover:bg-white hover:text-primary"
      >
        Book now
      </Link>
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
