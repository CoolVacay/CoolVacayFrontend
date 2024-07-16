import type { ErrorInterface } from "./definitions";
import { FetchError } from "./definitions";
import { auth } from "~/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_CASHE_IN_HOURS = 24;

export async function getFetch<T>(
  url: string,
  noCache = false,
): Promise<T | FetchError> {
  try {
    const session = await auth();
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      cache: noCache ? "no-store" : "force-cache",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    const data = (await res.json()) as T;
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function postFetch<T>(
  url: string,
  body: Record<string, string | number | undefined>,
  method?: string,
): Promise<T | FetchError | null> {
  const session = await auth();

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.accessToken}`,
  });

  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      method: method ?? "POST",
      headers,
      body: JSON.stringify(body),
    });
    //if error in response,throw the custom error
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    //if successful response,return the data
    const text = await res.text();
    const data = text ? (JSON.parse(text) as T) : null;
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function revalidateFetch<T>(
  url: string,
  revalidateInHours: number = STORE_CASHE_IN_HOURS,
): Promise<T | FetchError> {
  const seconds = revalidateInHours * 3600;
  try {
    const res = await fetch(`${API_BASE_URL}/api/${url}`, {
      next: { revalidate: seconds },
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    const data = (await res.json()) as T;
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      return new FetchError("An unknown error occurred");
    }
  }
}
