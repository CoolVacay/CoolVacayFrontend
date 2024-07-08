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
  FromDate: dayjs.Dayjs;
  ToDate: dayjs.Dayjs;
  NumberOfGuests: string;
  category: string;
  Match: string;
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
    searchParams.get("ToDate") !== null
      ? dayjs(searchParams.get("ToDate"))
      : dayjs().add(6, "day");

  const [searchParamsValues, setSearchParams] = useState<ISearchParams>({
    FromDate: dayjs(searchParams.get("FromDate") ?? undefined),
    ToDate: toDate,
    NumberOfGuests: searchParams.get("NumberOfGuests") ?? "1",
    Match: searchParams.get("Match") ?? "",
    category: searchParams.get("category") ?? "",
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
    searchParamsValues.FromDate &&
      updateSearchParams(["FromDate"], [searchParamsValues.FromDate]);
  }, [updateSearchParams, searchParamsValues.FromDate]);

  useEffect(() => {
    searchParamsValues.ToDate &&
      updateSearchParams(["ToDate"], [searchParamsValues.ToDate]);
  }, [updateSearchParams, searchParamsValues.ToDate]);

  useEffect(() => {
    updateSearchParams(["NumberOfGuests"], [searchParamsValues.NumberOfGuests]);
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
