const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_CASHE_IN_HOURS = 24;

export const getFetch = async <T>(url: string, noCache = false): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}/api/${url}`, {
    cache: noCache ? "no-store" : "force-cache",
  });
  const data = (await res.json()) as T;
  return data;
};

export const postFetch = async <T>(
  url: string,
  body: Record<string, string | number | undefined>,
): Promise<T | undefined> => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const res = await fetch(`${API_BASE_URL}/api/${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T;
  //TODO: check the response
  if (res.ok) {
    return data;
  } else {
    return undefined;
  }
};

export const revalidateFetch = async (
  url: string,
  revalidateInHours: number = STORE_CASHE_IN_HOURS,
) => {
  const seconds = revalidateInHours * 3600;
  const data = await fetch(`${API_BASE_URL}/api/${url}`, {
    next: { revalidate: seconds },
  });
  return data;
};
