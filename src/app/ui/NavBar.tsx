"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import IconGenerator from "./components/common/IconGenerator";
const urlsWithoutNavBar = ["authentication"];

function NavBar() {
  const pathname = usePathname();
  const showNavBar = !urlsWithoutNavBar.includes(pathname.split("/")[1] ?? "");
  const isWhiteVariant = pathname === "/";

  return (
    showNavBar && (
      <nav className="absolute z-10 flex w-full items-center justify-center gap-44 px-16 py-6">
        <div className="flex flex-grow justify-between">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${isWhiteVariant ? "white" : "blue"}.svg`}
              alt="CoolVacay Logo"
              width="166px"
              priority={true}
            />
          </Link>
          <div className="flex">
            <div
              className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              <Link href="/listings">
                <p className="text-sm">Listed places</p>
              </Link>
              <Link href="/listings">
                <p className="text-sm">Offers</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white">
          <Link href="/rental-income-estimator">
            <p className="text-sm">Vacation Rental Management</p>
          </Link>
          <Link href="/authentication">
            <button
              className={`flex items-center rounded-full ${isWhiteVariant ? "bg-white" : "bg-primary"} px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "text-black" : "text-white"}`}
            >
              Log In or Sign Up
              <span className="ml-2">
                <IconGenerator
                  alt="avatar icon"
                  src={`/avatar_${isWhiteVariant ? "white" : "blue"}.svg`}
                  width="32px"
                />
              </span>
            </button>
          </Link>
        </div>
      </nav>
    )
  );
}

export default NavBar;
