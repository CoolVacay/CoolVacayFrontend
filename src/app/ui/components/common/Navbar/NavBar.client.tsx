"use client";

import dayjs from "dayjs";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGenerator } from "../IconGenerator";
import NavBarLoginButton from "./NavBarLoginButton";
import type { TUserData } from "~/app/(application)/definitions";

export default function NavBar({
  session,
}: {
  session: TUserData["profile"] | null;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isWhiteVariant =
    pathname === "/" ||
    pathname.endsWith("about-us") ||
    pathname.endsWith("terms-and-conditions") ||
    pathname.endsWith("privacy-policy") ||
    pathname.endsWith("accessibility-statement");
  const noMaxWidth = pathname.startsWith("/listings");

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="z-10 flex h-[96px] w-full justify-center py-6">
      <div
        className={`flex h-12 w-full ${
          isWhiteVariant || !noMaxWidth ? "max-w-[1220px]" : "px-[70px]"
        } items-center justify-between px-4 sm:px-6 lg:px-8`}
      >
        <div className="flex md:flex-grow items-center justify-between w-full sm:w-auto">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${
                isWhiteVariant ? "white" : "blue"
              }.svg`}
              alt="CoolVacay Logo"
              width="166px"
              priority={true}
            />
          </Link>
          <div className="flex">
            <div
              className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              <Link
                href={`/listings?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1&pageNum=1`}
              >
                <p className="text-sm">Listed places</p>
              </Link>
              {/* <Link href="/listings">
                <p className="text-sm">Offers</p>
              </Link> */}
            </div>
          </div>
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src="/menu_icon.svg"
              alt="Menu"
              width="24px"
            />
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-grow sm:justify-between sm:items-center">
          <div className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}>
            <Link href="/listings">
              <p className="text-sm">Listed places</p>
            </Link>
            <Link href="/listings">
              <p className="text-sm">Offers</p>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/rental-income-estimator">
              <p
                className={`text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
              >
                Vacation Rental Management
              </p>
            </Link>
            {session ? (
              <Link href="/profile/reservations">
                <p
                  className={`text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
                >
                  <span className="mr-[14px]">•</span> My bookings
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
      {menuOpen && (
        <div className="absolute top-[96px] left-0 right-0 bg-white shadow-lg sm:hidden">
          <div className="flex flex-col items-start gap-5 p-6">
            <Link href="/listings">
              <p className="text-sm">Listed places</p>
            </Link>
            <Link href="/listings">
              <p className="text-sm">Offers</p>
            </Link>
            <Link href="/rental-income-estimator">
              <p className="text-sm">Vacation Rental Management</p>
            </Link>
            {session ? (
              <Link href="/profile/reservations">
                <p className="text-sm">My bookings</p>
              </Link>
            ) : (
              <Link href="/signin">
                <button className="flex items-center rounded-full px-4 py-2 text-sm font-normal bg-primary text-white">
                  Log In or Sign Up
                  <span className="ml-2">
                    <IconGenerator
                      alt="avatar icon"
                      src="/avatar_blue.svg"
                      width="32px"
                    />
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
