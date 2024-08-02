"use server";

import { postFetch, getFetch, getHTMLFetch } from "../utils/api-helpers";
import { FetchError } from "../utils/definitions";
import type { IListingData } from "./definitions";
import type { IPricingDetails } from "../ui/components/listing/BookNow/BookNowCard.client";
import type { IParams } from "./definitions";
import type { TUserData } from "./definitions";
import { revalidatePath } from "next/cache";
import { logOut } from "../(authentication)/actions";
import type {
  IInquireArgs,
  IProfileDetails,
  IBookingPaymentArgs,
  IPassArgs,
  ICountries,
  ILocationsList,
  IReservationsDetails,
} from "./definitions";

export async function inquire({
  name,
  message,
  phone,
  email,
  source,
  id,
}: IInquireArgs) {
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

export async function updateProfile({
  email,
  firstName,
  lastName,
  phone,
  nationality,
  dateOfBirth,
  gender,
}: IProfileDetails) {
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
      return "Failed to update the profile details";
    }
  }
}

export async function bookingPayment({
  userId,
  listingId,
  source,
  fromDate,
  toDate,
  adults,
  children,
  infants,
  pets,
  cardDetails: { cardNumber, expiryDate, cvc, cardHolderName },
}: IBookingPaymentArgs) {
  try {
    const values = {
      userId: userId,
      listingId: listingId,
      source: source,
      fromDate: fromDate,
      toDate: toDate,
      adults: adults,
      children: children,
      infants: infants,
      pets: pets,
      cardDetails: {
        cardNumber: cardNumber.replace(/-/g, ""),
        expiryDate: expiryDate,
        cvc: cvc,
        cardHolderName: cardHolderName,
      },
    };
    const res = await postFetch(`/Reservations`, values);
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to complete payment";
    }
  }
}

export async function updatePassword({
  userId,
  oldPassword,
  newPassword,
}: IPassArgs) {
  try {
    const values = {
      oldPassword,
      newPassword,
    };
    const modValues = Object.fromEntries(
      Object.entries(values).filter(([k, _]) => k !== "confirmPassword"),
    );
    const res = await postFetch(
      `/Users/${userId}/change-password`,
      modValues,
      "PATCH",
    );
    revalidatePath("/profile");
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to update password";
    }
  }
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
    return res ?? [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getBlogContent(id: string) {
  try {
    const res = await getHTMLFetch(`/Blogs/${id}/content`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch blog content");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getBlogHTML() {
  try {
    const res = await getFetch<IBlog[]>(`/Blogs`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch blogs");
    }
    return res ?? [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
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
    const res = await getFetch<IListingData>(`/Listings/${source}/${id}`);
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
    const res = await getFetch<IListingData[]>(`/listings?${query}`, true);
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
    const res = await getFetch<TUserData["profile"]>(`/Users/email/${email}`);
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
    const res = await getFetch<IListingData[]>(
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

export async function getReservationsDetails(userId: string) {
  try {
    const res = await getFetch<IReservationsDetails[]>(
      `/Reservations/user/${userId}`,
    );
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch reservations");
    }
    return res ?? [];
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function registerFollower({ email }: { email: string }) {
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

export async function deactivateAccount(
  prevState: string | undefined,
  { userId }: { userId: string },
) {
  try {
    const res = await postFetch(`/Users/${userId}`, { userId }, "DELETE");
    await logOut();
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return "Failed to deactivate user";
    }
  }
}
