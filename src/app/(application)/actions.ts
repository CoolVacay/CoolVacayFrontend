"use server";

import { postFetch, getFetch, getHTMLFetch } from "../utils/api-helpers";
import { FetchError } from "../utils/definitions";
import type { ListingData } from "./definitions";
import type { IPricingDetails } from "../ui/components/listing/BookNow/BookNowCard.client";
import type { IParams } from "./definitions";
import type { UserData } from "./definitions";
import { revalidatePath } from "next/cache";

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
      propertySource: source,
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

interface IProfileDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  gender: string;
}
export async function updateProfile(
  prevState: string | undefined,
  {
    email,
    firstName,
    lastName,
    phone,
    nationality,
    dateOfBirth,
    gender,
  }: IProfileDetails,
) {
  try {
    const values = {
      email,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      nationality,
      gender,
    };
    const modValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v != ""),
    );
    const res = await postFetch(`/users`, modValues, "PUT");
    revalidatePath("/profile");
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
  states:
    | {
        id: string;
        name: string;
      }[]
    | [];
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
    return [];
  }
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  thumbnailImageUrl: string;
  readTime: string;
  createdOn: string;
  relatedLocation: string;
}

export async function getBlogs() {
  try {
    const res = await getFetch<IBlog[]>(`/Blogs`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch blogs");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export interface ILocationsList {
  icon: string;
  match: string;
  displayName: string;
}

export async function getLocationsList() {
  try {
    const res = await getFetch<ILocationsList[]>(`/Listings/Codifiers`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch locations");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getListingData({ source, id }: IParams) {
  try {
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

export async function getProfileInfo(email: string) {
  try {
    const res = await getFetch<UserData["profile"]>(`/Users/email/${email}`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch profile data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getStaticPage(type: string) {
  try {
    const res = await getHTMLFetch(`/StaticPages/${type}`);
    if (res instanceof FetchError) {
      throw new Error(`Failed to get ${type} static page`);
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getSimilarListings({ source, id }: IParams) {
  try {
    const res = await getFetch<ListingData[]>(
      `/Listings/${source}/${id}/similar`,
      true,
    );
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch similar listing");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function registerFollower(
  prevState: string | undefined,
  { email }: { email: string },
) {
  try {
    const res = await postFetch(`/Followers/Register`, { email });
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to subscribe";
    }
  }
}
