const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_CASHE_IN_HOURS = 24;

export const getFetch = async (url: string, noCache = false) => {
  const data = await fetch(`${API_BASE_URL}/api/${url}`, {
    cache: noCache ? "no-store" : "force-cache",
  });
  return data;
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
