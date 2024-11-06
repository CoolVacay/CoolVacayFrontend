"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { attachSearchParamsAsStringWithoutMatch } from "~/app/utils/searchParamsHelper";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <nav aria-label="Breadcrumb" className="mb-1 block">
      <ol className="flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`flex items-center ${breadcrumb.active ? "text-gray-900" : "text-gray-500"}`}
          >
            <button
              onClick={() => {
                const newRoute =
                  breadcrumb.label === "Booking"
                    ? attachSearchParamsAsStringWithoutMatch(breadcrumb.href, {
                        category: searchParams.get("category") ?? "",
                        fromDate: searchParams.get("fromDate") ?? "",
                        toDate: searchParams.get("toDate") ?? "",
                        numberOfGuests:
                          searchParams.get("numberOfGuests") ?? "1",
                      })
                    : breadcrumb.href;

                router.push(newRoute);
              }}
              disabled={breadcrumb.active}
            >
              {breadcrumb.label}
            </button>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">{">"}</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
