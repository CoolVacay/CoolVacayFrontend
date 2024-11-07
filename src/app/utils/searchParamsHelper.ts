interface SearchParams {
  category?: string;
  match?: string;
  numberOfGuests?: string;
  toDate?: string;
  fromDate?: string;
}

export function attachSearchParamsAsStringWithoutMatch(
  baseHref: string,
  searchParams: SearchParams,
): string {
  return (
    baseHref +
    `${!baseHref.includes("?") ? "?" : ""}` +
    `${searchParams?.numberOfGuests ? "&numberOfGuests=" + searchParams.numberOfGuests : ""}${searchParams?.category ? "&category=" + searchParams.category : ""}${searchParams?.fromDate ? "&fromDate=" + searchParams.fromDate : ""}${searchParams?.toDate ? "&toDate=" + searchParams.toDate : ""}`
  );
}
