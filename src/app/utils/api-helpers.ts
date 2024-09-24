import type { ErrorInterface } from "./definitions";
import { revalidatePath } from "next/cache";
import { FetchError } from "./definitions";
import { auth } from "~/auth";

const API_BASE_URL = process.env.API_URL;
const DOMAIN_NAME = process.env.SITE_NAME;

//TODO:refactor headers
export async function createHeaders(contentType: string) {
  try {
    const session = await auth();
    const headers = {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": contentType,
      "site-name": DOMAIN_NAME,
    };
    return headers;
  } catch (err) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    return headers;
  }
}

export async function fetcher<T>(
  url: string,
  errorMessage: string,
  noCache = false,
): Promise<T | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${url}`, {
      cache: noCache ? "no-store" : "force-cache",
      headers: await createHeaders("application/json"),
    });

    if (!res.ok) {
      const json = (await res.json()) as Record<string, any> & {
        error?: string;
      };
      if (json.error || json.message) {
        throw new FetchError(json.error ?? json.message, res.status);
      } else {
        throw new FetchError("An unexpected error occurred", res.status);
      }
    }
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(
      err,
      `--------------------------------------------> ${errorMessage}`,
    );
  }
}

export async function getHTMLFetch(url: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      headers: await createHeaders("text/html"),
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    const data = await res.text();
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      console.error(err, "err");
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function postFetch<T>(
  url: string,
  body:
    | Record<string, string | Record<string, string> | number | undefined>
    | FormData
    | T,
  method?: string,
): Promise<T | FetchError | null> {
  const session = await auth();

  const headers = new Headers({
    Authorization: `Bearer ${session?.user?.accessToken}`,
  });

  if (!(body instanceof FormData)) {
    headers.append("Content-Type", "application/json");
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      method: method ?? "POST",
      headers: headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    //if error in response,throw the custom error
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText?.error ?? errorText?.message);
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

export async function postData<T>(
  url: string,
  values: Record<string, string> | FormData | T,
  errorMessage: string,
  method?: string,
  pathToRevalidate?: string,
) {
  try {
    const res = await postFetch<T>(url, values, method);
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return errorMessage;
    }
  }
}
