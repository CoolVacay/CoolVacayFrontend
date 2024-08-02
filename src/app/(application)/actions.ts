"use server";

import { getHTMLFetch, getData, postData } from "../utils/api-helpers";
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
} from "./definitions";

//////////////GET/////////////

export const getCountries = () =>
  getData<ICountries[]>(`/countries`, "Failed to fetch countries");

export const getBlogs = () =>
  getData<IBlog[]>(`/Blogs`, "Failed to fetch blogs");

export const getLocationsList = () =>
  getData<ILocationsList[]>(`/Listings/Codifiers`, "Failed to fetch locations");

export const getListingData = ({ source, id }: IParams) =>
  getData<IListingData>(
    `/Listings/${source}/${id}`,
    "Failed to fetch listing data",
  );

export const getFilteredListings = ({ source, id }: IParams) =>
  getData<IListingData[]>(
    `/Listings/${source}/${id}`,
    "Failed to fetch listings",
  );

export const getProfileInfo = (email: string) =>
  getData<TUserData["profile"]>(
    `/Users/email/${email}`,
    "Failed to fetch profile data",
  );

export const getPricingDetails = (
  source: string,
  id: string,
  startDate: string,
  endDate: string,
  numberOfGuests: string,
) =>
  getData<IPricingDetails>(
    `/Listings/${source}/${id}/priceDetails?startDate=${startDate}&endDate=${endDate}&numberOfGuests=${numberOfGuests}`,
    "Failed to fetch listing data",
  );

export const getSimilarListings = ({ source, id }: IParams) =>
  getData<IListingData[]>(
    `/Listings/${source}/${id}/similar`,
    "Failed to fetch similar listings",
    true,
  );

export const getReservationsDetails = (userId: string) =>
  getData<IReservationsDetails[]>(
    `/Reservations/user/${userId}`,
    "Failed to fetch reservations",
  );

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
