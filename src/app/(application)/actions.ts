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
} from "./definitions";

//////////////GET/////////////

export const getSiteConfigurations = () =>
  fetcher<IReadOnlySiteConfigurationProperties>(
    `SiteConfiguration`,
    "Failed to fetch configurations",
  );

export const getCountries = () =>
  fetcher<ICountries[]>(`countries`, "Failed to fetch countries");

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

export const getBlogs = () =>
  fetcher<IBlog[]>(`Blogs`, "Failed to fetch blogs");

export const getLocationsList = () =>
  fetcher<ILocationsList[]>(`Listings/Codifiers`, "Failed to fetch locations");

export const getListingData = ({ source, id }: IParams) =>
  fetcher<IListingData>(
    `Listings/${source}/${id}`,
    "Failed to fetch listing data",
  );

export const getFilteredListings = (query: string) => {
  const PAGE_SIZE = 12;
  return fetcher<IAllListings>(
    `Listings?${query}&pageSize=${PAGE_SIZE}`,
    "Failed to fetch filtered listings",
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

export const getPricingDetails = (
  source: string,
  id: string,
  startDate: string,
  endDate: string,
  numberOfGuests: string,
) =>
  fetcher<IPricingDetails>(
    `Listings/${source}/${id}/priceDetails?startDate=${startDate}&endDate=${endDate}&numberOfGuests=${numberOfGuests}`,
    "Failed to fetch listing data",
  );

export const getAvailabilityDates = (
  source: string,
  id: string,
  startDate: string,
  endDate: string,
) =>
  fetcher<IPropertyAvailability>(
    `Listings/availability?FromDate=${startDate}&ToDate=${endDate}&source=${source}&ListingId=${id}`,
    "Failed to fetch available dates",
  );

export const getAvailabilityPeriods = (
  source: string,
  id: string,
  startDate: string,
) =>
  fetcher<string[]>(
    `Listings/availability_periods?FromDate=${startDate}&source=${source}&ListingId=${id}`,
    "Failed to fetch availablility periods",
  );

export const getCloseDatesListings = (
  pageSize: string,
  match: string,
  startDate: string,
  endDate: string,
  category: string,
) =>
  fetcher<ICloseDatesListings[]>(
    `Listings/close_dates?PageSize=${pageSize}&Match=${match}&FromDate=${startDate}&ToDate=${endDate}&category=${category}`,
    "Failed to fetch close dates listings",
  );

export const getSimilarListings = ({ source, id }: IParams) =>
  fetcher<IListingData[]>(
    `Listings/${source}/${id}/similar`,
    "Failed to fetch similar listings",
    true,
  );

export const getCategories = () =>
  fetcher<IPopularCategoriesData[]>(
    `categories`,
    "Failed to fetch popular categories",
  );

export const getFeaturedListings = () =>
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

export const getBlogById = (id: string) =>
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

export const inquire = (values: IInquireArgs) =>
  postData(`/inquire`, values, "Failed to send the inquiry");

export const updateProfile = (values: IProfileDetails) =>
  postData(
    `/users`,
    values,
    "Failed to update the profile details",
    "PUT",
    "/profile",
  );

export const bookingPayment = (values: IBookingPaymentArgs) =>
  postData(
    `/Reservations`,
    values,
    "Failed to complete payment",
    "POST",
    "/profile/reservations",
  );

export const updatePassword = ({ userId, ...rest }: IPassArgs) =>
  postData(
    `/Users/${userId}/change-password`,
    rest,
    "Failed to update password",
    "PATCH",
    "/profile",
  );

export const uploadProfilePicture = ({
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

export const deleteProfilePicture = (userId: string) =>
  postData(
    `/Users/${userId}/profile-picture`,
    userId,
    "Failed to delete profile picture",
    "DELETE",
  );

export const registerFollower = ({ email }: { email: string }) =>
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
