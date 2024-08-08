"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGenerator } from "../IconGenerator";
import NavBarLoginButton from "./NavBarLoginButton";
import type { TUserData } from "~/app/(application)/definitions";

import { getCurrentDates } from "~/app/utils/helpers";
import NavBardDialog from "./NavBarDialog";

const whiteVariantPaths = [
  "/",
  "/about-us",
  "/terms-and-conditions",
  "/privacy-policy",
  "/accessibility-statement",
];

export default function NavBar({
  session,
}: {
  session: TUserData["profile"] | null;
}) {
  const pathname = usePathname();
  const isWhiteVariant = whiteVariantPaths.includes(pathname);
  const noMaxWidth = pathname.startsWith("/listings");

  const [openMenu, setOpenMenu] = useState(false);
  const { startDate, endDate } = getCurrentDates();

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav className="z-10 flex h-12 w-full scroll-px-4 justify-center px-6 py-3 sm:h-24 sm:py-6">
      <div
        className={`flex w-full ${isWhiteVariant || !noMaxWidth ? "max-w-[1220px]" : "px-[70px]"} scroll-px-4 items-center justify-between gap-44`}
      >
        <div className="flex w-full items-center justify-between sm:w-auto md:flex-grow">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${isWhiteVariant ? "white" : "blue"}.svg`}
              alt="CoolVacay Logo"
              className="w-[108px] sm:w-[166px]"
              priority={true}
            />
          </Link>
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src={`/menu_icon_${isWhiteVariant ? "white" : "black"}.svg`}
              alt="Menu"
              width="26px"
            />
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-grow sm:items-center sm:justify-between">
          <div
            className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
          >
            <Link
              className="text-center text-sm"
              href={`/listings?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1&pageNum=1`}
            >
              Listed places
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/rental-income-estimator"
              className={`text-center text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              Vacation Rental Management
            </Link>
            {session ? (
              <Link href="/profile/reservations" className="hidden sm:block">
                <p
                  className={`text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
                >
                  <span className="mr-[14px] hidden  text-center lg:inline-block">
                    •
                  </span>{" "}
                  My bookings
                </p>
              </Link>
            ) : null}
            {!session ? (
              <Link href="/signin">
                <button
                  className={`flex items-center rounded-full px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "bg-white text-black" : "bg-primary text-white"}`}
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
            ) : (
              <NavBarLoginButton
                session={session}
                isWhiteVariant={isWhiteVariant}
              />
            )}
          </div>
        </div>
      </div>
      <NavBardDialog
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        session={session}
      />
    </nav>
  );
}
