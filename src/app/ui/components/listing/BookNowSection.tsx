"use client";

import Link from "next/link";
import { Divider } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { RangeDatePicker, FormDialog, SelectInput } from "../common";
import type { ListingData } from "~/app/(application)/definitions";
import dayjs from "dayjs";
import type { DateRangeType } from "../home/SearchCard";
import type { SelectChangeEvent } from "@mui/material";

export default function BookNow({
  listing,
  params,
}: {
  listing: ListingData;
  params: {
    source: string;
    id: string;
  };
}) {
  const listingQuery = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isPriceCalculated =
    pathname.endsWith("billing-address") || pathname.endsWith("payment");
  const endDate =
    listingQuery.get("ToDate") !== null
      ? dayjs(listingQuery.get("ToDate"))
      : dayjs().add(6, "day");

  const [dates, setDates] = useState<DateRangeType>([
    dayjs(listingQuery.get("FromDate") ?? undefined),
    endDate,
  ]);
  const [numberOfGuests, setNumberOfGuests] = useState(
    listingQuery.get("NumberOfGuests") ?? "1",
  );

  const [fromDate, toDate] = dates;
  const searchParams = useMemo(() => {
    return new URLSearchParams(listingQuery);
  }, [listingQuery]);
  const totalFair = listing.price * toDate!.diff(fromDate, "day");

  const updateSearchParams = useCallback(
    (param: string, value: string) => {
      searchParams.delete(param);
      if (value) {
        searchParams.append(param, value);
        router.replace(`${pathname}?${searchParams.toString()}`, {
          scroll: false,
        });
      }
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    fromDate && updateSearchParams("FromDate", fromDate.format("YYYY-MM-DD"));
  }, [updateSearchParams, fromDate]);
  useEffect(() => {
    toDate && updateSearchParams("ToDate", toDate.format("YYYY-MM-DD"));
  }, [updateSearchParams, toDate]);
  useEffect(() => {
    updateSearchParams("NumberOfGuests", numberOfGuests);
  }, [updateSearchParams, numberOfGuests]);

  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <div
        className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5 ${isPriceCalculated && "pointer-events-none bg-[#fAfAfA]"}`}
      >
        {!isPriceCalculated ? (
          <div className="flex justify-between">
            <h6>Choose your preferred day</h6>
            <h6 className="font-medium text-primary">View calendar</h6>
          </div>
        ) : null}
        <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
          <div
            className="relative px-6 py-5"
            style={{ borderBottom: "1px solid #EAEAEF" }}
          >
            <RangeDatePicker size="small" dates={dates} setDates={setDates} />
          </div>
          <div className="px-6 py-5">
            <SelectInput
              size="small"
              value={numberOfGuests ?? "1"}
              onChange={(e: SelectChangeEvent<string>) =>
                setNumberOfGuests(e.target.value)
              }
            />
          </div>
        </div>
        {!isPriceCalculated ? (
          <Link
            href={`/book/${params.source}/${params.id}/billing-address?${searchParams.toString()}`}
            className="flex h-[58px] w-full justify-center rounded-full bg-primary py-4 text-white hover:border hover:border-primary hover:bg-white hover:text-primary"
          >
            Book now
          </Link>
        ) : null}

        <Divider />
        {!isPriceCalculated && (
          <FormDialog
            title="Inquire now"
            subtitle="Have a question or feedback? Fill out the form
            below, and we'll get back to you as soon as possible."
            listing={listing}
          >
            <button className="w-full rounded-full border border-primary bg-white py-4 text-primary hover:bg-primary hover:text-white">
              Inquire now
            </button>
          </FormDialog>
        )}
        {isPriceCalculated ? (
          <>
            <div className="flex flex-col gap-4 font-medium">
              <h6 className="flex justify-between text-lg text-[#858C93]">
                ${listing.price} x {toDate!.diff(fromDate, "day")} nights
                <span className="text-black">
                  $
                  {totalFair.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </h6>
              <h6 className="flex justify-between text-lg text-[#858C93]">
                {/* TODO:replace with actual fee */}
                Cleaning Fee
                <span className="text-black">
                  $
                  {(60).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </h6>
              <h5 className="flex justify-between text-2xl">
                Total
                <span>
                  $
                  {(totalFair + 60.0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </h5>
            </div>
          </>
        ) : null}
        {!isPriceCalculated ? (
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
        ) : null}
      </div>
    </div>
  );
}
