"use server";

import { postFetch, getFetch } from "../utils/api-helpers";
import { FetchError } from "../utils/definitions";
import type { ListingData } from "./definitions";
import type { IPricingDetails } from "../ui/components/listing/BookNow/BookNowCard.client";
export interface IInquireArgs {
  name?: string;
  message?: string;
  phone?: string;
  email?: string;
  source?: string;
  id?: string;
}

export async function inquire(
  prevState: string | undefined,
  { name, message, phone, email, source, id }: IInquireArgs,
) {
  try {
    const values = {
      name: name,
      message: message,
      phone: phone,
      email: email,
      propertyId: id,
      peopropertySource: source,
    };
    const modValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v != ""),
    );
    const res = await postFetch(`/inquire`, modValues);
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to send the inquiry";
    }
  }
}

export interface PricingDetailsArgs {
  source: string;
  id: string;
  startDate: string;
  endDate: string;
  numberOfGuests: string;
}

export async function getPricingDetails(
  source: string,
  id: string,
  startDate: string,
  endDate: string,
  numberOfGuests: string,
) {
  try {
    const res = await getFetch<IPricingDetails>(
      `/Listings/${source}/${id}/priceDetails?startDate=${startDate}&endDate=${endDate}&numberOfGuests=${numberOfGuests}`,
    );
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export interface ICountries {
  id: string;
  name: string;
  states: {
    id: string;
    name: string;
  }[];
}

export async function getCountries() {
  try {
    const res = await getFetch<ICountries[]>(`/countries`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getListingData({
  source,
  id,
}: {
  source: string;
  id: string;
}) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await getFetch<ListingData>(`/Listings/${source}/${id}`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getFilteredListings(query: string) {
  try {
    const res = await getFetch<ListingData[]>(`/listings?${query}`, true);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listings");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}
