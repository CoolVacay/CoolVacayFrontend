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
import type { Dayjs } from "dayjs";
interface SearchParams {
  FromDate: dayjs.Dayjs;
  ToDate: dayjs.Dayjs;
  NumberOfGuests: string;
  category?: string;
}

interface SearchParamsContextType {
  searchParamsValues: SearchParams;
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

  // console.log(searchParams, "searchParams");

  const toDate =
    searchParams.get("ToDate") !== null
      ? dayjs(searchParams.get("ToDate"))
      : dayjs().add(6, "day");

  const [searchParamsValues, setSearchParams] = useState<SearchParams>({
    FromDate: dayjs(searchParams.get("FromDate") ?? undefined),
    ToDate: toDate,
    NumberOfGuests: searchParams.get("NumberOfGuests") ?? "1",
    category: searchParams.get("category") ?? "",
  });

  const updateSearchParams = useCallback(
    (params: string[], values: string[] | dayjs.Dayjs[]) => {
      console.log("runs here");
      // const params = new URLSearchParams(readOnlySearchParams.toString());
      params.forEach((param, index) => {
        if (typeof values[index] !== "string") {
          searchParams.set(
            param,
            (values[index] as dayjs.Dayjs)?.format("YYYY-MM-DD"),
          );
        } else {
          searchParams.set(param, values[index]!);
        }
        console.log(param, "param");
        console.log(values[index], "values[index]");
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

  console.log(searchParamsValues, "searchParamsValues");

  useEffect(() => {
    searchParamsValues.FromDate &&
      updateSearchParams(["FromDate"], [searchParamsValues.FromDate]);
    console.log("runs here 1 ");
  }, [updateSearchParams, searchParamsValues.FromDate]);

  useEffect(() => {
    searchParamsValues.ToDate &&
      updateSearchParams(["ToDate"], [searchParamsValues.ToDate]);
    console.log("runs here 2 ");
  }, [updateSearchParams, searchParamsValues.ToDate]);

  useEffect(() => {
    updateSearchParams(["NumberOfGuests"], [searchParamsValues.NumberOfGuests]);
    console.log("runs here 3");
  }, [updateSearchParams, searchParamsValues.NumberOfGuests]);

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
