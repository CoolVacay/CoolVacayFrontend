"use server";

import { auth } from "~/auth";
import { getHTMLFetch, postData, fetcher } from "../utils/api-helpers";
import { FetchError } from "../utils/definitions";
import { logOut } from "../(authentication)/actions";

import type { IPricingDetails } from "../ui/components/listing/BookNow/BookNowCard.client";
import type {
  IInquireArgs,
  IProfileDetails,
  IBookingPaymentArgs,
  IPassArgs,
  ICountries,
  ILocationsList,
  IReservationsDetails,
  IBlog,
  IListingData,
  IParams,
  TUserData,
  IAllListings,
  IPropertyAvailability,
  ICloseDatesListings,
  IPopularCategoriesData,
  IReadOnlySiteConfigurationProperties,
  IProperty,
} from "./definitions";

//////////////GET/////////////

export const getSiteConfigurations = async () =>
  fetcher<IReadOnlySiteConfigurationProperties>(
    `SiteConfiguration`,
    "Failed to fetch configurations",
  );

export const getCountries = async () =>
  fetcher<ICountries[]>(`countries`, "Failed to fetch countries");

export const getProperties = async () =>
  fetcher<IProperty[]>(`listings/properties`, "Failed to fetch properties");

export async function isValidToken() {
  const session = await auth();
  if (!session?.user?.accessToken) {
    return false;
  }
  return fetcher<boolean>(
    `Auth/is_valid?token=${session?.user?.accessToken}`,
    "Failed to check if token is valid",
    true,
  );
}

export const getBlogs = async () =>
  fetcher<IBlog[]>(`Blogs`, "Failed to fetch blogs");

export const getLocationsList = async () =>
  fetcher<ILocationsList[]>(`Listings/Codifiers`, "Failed to fetch locations");

export const getListingData = async ({ source, id }: IParams) =>
  fetcher<IListingData>(
    `Listings/${source}/${id}`,
    "Failed to fetch listing data",
  );

export const getFilteredListings = async (query: string) => {
  const PAGE_SIZE = 12;
  return fetcher<IAllListings>(
    `Listings?${query}&pageSize=${PAGE_SIZE}`,
    "Failed to fetch filtered listings",
    true,
  );
};

export async function getProfileInfo() {
  const session = await auth();

  if (!session?.user?.email) {
    return undefined;
  }
  return fetcher<TUserData["profile"]>(
    `Users/email/${session.user.email}`,
    "Failed to fetch profile data",
    true,
  );
}

export const getPricingDetails = async (
  source: string,
  id: string,
  startDate: string,
  endDate: string,
  numberOfGuests: string,
) =>
  fetcher<IPricingDetails>(
    `Listings/${source}/${id}/priceDetails?startDate=${startDate}&endDate=${endDate}&numberOfGuests=${numberOfGuests}`,
    "Failed to fetch listing data",
    true,
  );

export const getAvailabilityDates = async (
  source: string,
  id: string,
  startDate: string,
  endDate: string,
) =>
  fetcher<IPropertyAvailability>(
    `Listings/availability?FromDate=${startDate}&ToDate=${endDate}&source=${source}&ListingId=${id}`,
    "Failed to fetch available dates",
    true,
  );

export const getAvailabilityPeriods = async (
  source: string,
  id: string,
  startDate: string,
) =>
  fetcher<string[]>(
    `Listings/availability_periods?FromDate=${startDate}&source=${source}&ListingId=${id}`,
    "Failed to fetch availablility periods",
    true,
  );

export const getCloseDatesListings = async (
  pageSize: string,
  match: string,
  startDate: string,
  endDate: string,
  category: string | null,
) =>
  fetcher<ICloseDatesListings[]>(
    `Listings/close_dates?PageSize=${pageSize}&Match=${match}&FromDate=${startDate}&ToDate=${endDate}&category=${category}`,
    "Failed to fetch close dates listings",
    true,
  );

export const getSimilarListings = async ({ source, id }: IParams) =>
  fetcher<IListingData[]>(
    `Listings/${source}/${id}/similar`,
    "Failed to fetch similar listings",
    true,
  );

export const getCategories = async () =>
  fetcher<IPopularCategoriesData[]>(
    `categories`,
    "Failed to fetch popular categories",
  );

export const getFeaturedListings = async () =>
  fetcher<IListingData[]>(
    `listings/featured`,
    "Failed to fetch featured listings",
  );

export async function getReservationsDetails() {
  const session = await auth();
  if (!session?.user?.id) return undefined;

  return fetcher<IReservationsDetails[]>(
    `Reservations/user/${session.user.id}`,
    "Failed to fetch reservations",
  );
}

export const getBlogById = async (id: string) =>
  fetcher<IBlog>(`Blogs/${id}`, "Failed to fetch blog by id");

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

/////////////POST-PUT-PATCH-DELETE/////////////

export const inquire = async (values: IInquireArgs) =>
  postData(`/inquire`, values, "Failed to send the inquiry");

export const updateProfile = async (values: IProfileDetails) =>
  postData(
    `/users`,
    values,
    "Failed to update the profile details",
    "PUT",
    "/profile",
  );

export const bookingPayment = async (values: IBookingPaymentArgs) =>
  postData(
    `/Reservations`,
    values,
    "Failed to complete payment",
    "POST",
    "/profile/reservations",
  );

export const updatePassword = async ({ userId, ...rest }: IPassArgs) =>
  postData(
    `/Users/${userId}/change-password`,
    rest,
    "Failed to update password",
    "PATCH",
    "/profile",
  );

export const uploadProfilePicture = async ({
  userId,
  formData,
}: {
  userId: string;
  formData: FormData;
}) =>
  postData(
    `/users/${userId}/profile-picture`,
    formData,
    "Failed to upload",
    "POST",
    "/profile",
  );

export const deleteProfilePicture = async (userId: string) =>
  postData(
    `/Users/${userId}/profile-picture`,
    userId,
    "Failed to delete profile picture",
    "DELETE",
  );

export const registerFollower = async ({ email }: { email: string }) =>
  postData(`/Followers/Register`, email, "Failed to subscribe");

export const deactivateAccount = async (
  prevState: string | undefined,
  { userId }: { userId: string },
) => {
  const data = await postData(
    `/Users/${userId}`,
    userId,
    "Failed to deactivate user",
    "DELETE",
  );
  await logOut();
  return data;
};
