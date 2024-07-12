"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";

export interface ISearchParams {
  fromDate: dayjs.Dayjs;
  toDate: dayjs.Dayjs;
  numberOfGuests: string;
  category: string;
  match: string;
  modal: string;
}

interface SearchParamsContextType {
  searchParamsValues: ISearchParams;
  updateSearchParams: (
    params: string[],
    values: string[] | dayjs.Dayjs[],
  ) => void;
  searchParams: URLSearchParams;
}

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(
  undefined,
);

export const SearchParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const readOnlySearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useMemo(() => {
    return new URLSearchParams(readOnlySearchParams.toString());
  }, [readOnlySearchParams]);

  const toDate =
    searchParams.get("toDate") !== null
      ? dayjs(searchParams.get("toDate"))
      : dayjs().add(6, "day");

  const [searchParamsValues, setSearchParams] = useState<ISearchParams>({
    fromDate: dayjs(searchParams.get("fromDate") ?? undefined),
    toDate: toDate,
    numberOfGuests: searchParams.get("numberOfGuests") ?? "1",
    match: searchParams.get("match") ?? "",
    category: searchParams.get("category") ?? "",
    modal: searchParams.get("modal") ?? "",
  });

  const updateSearchParams = useCallback(
    (params: string[], values: string[] | dayjs.Dayjs[]) => {
      params.forEach((param, index) => {
        if (typeof values[index] !== "string") {
          searchParams.set(
            param,
            (values[index] as dayjs.Dayjs)?.format("YYYY-MM-DD"),
          );
        } else {
          if (values[0] !== "") {
            searchParams.set(param, values[index] as string);
          } else {
            searchParams.delete(param);
          }
        }
        setSearchParams((prevParams) => ({
          ...prevParams,
          [param]: values[index],
        }));
        router.push(`${pathname}?${searchParams.toString()}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    searchParamsValues.fromDate &&
      updateSearchParams(["fromDate"], [searchParamsValues.fromDate]);
  }, [updateSearchParams, searchParamsValues.fromDate]);

  useEffect(() => {
    searchParamsValues.toDate &&
      updateSearchParams(["toDate"], [searchParamsValues.toDate]);
  }, [updateSearchParams, searchParamsValues.toDate]);

  useEffect(() => {
    updateSearchParams(["numberOfGuests"], [searchParamsValues.numberOfGuests]);
  }, [updateSearchParams, searchParamsValues.numberOfGuests]);

  return (
    <SearchParamsContext.Provider
      value={{ searchParamsValues, updateSearchParams, searchParams }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useAppSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useAppSearchParams must be used within a SearchParamsProvider",
    );
  }
  return context;
};
