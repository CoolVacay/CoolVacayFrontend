"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGenerator } from "../IconGenerator";
import NavBarLoginButton from "./NavBarLoginButton";
import type { TUserData } from "~/app/(application)/definitions";

import { getCurrentDates } from "~/app/utils/helpers";
import NavBardDialog from "./NavBarDialog";
import { logOut } from "~/app/(authentication)/actions";

const whiteVariantPaths = [
  "/",
  "/about-us",
  "/terms-and-conditions",
  "/privacy-policy",
  "/accessibility-statement",
];

export default function NavBar({
  userData,
  isTokenValid,
}: {
  userData?: TUserData["profile"] | null;
  isTokenValid: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (userData && !isTokenValid) {
      const checkSync = async () => {
        await logOut();
      };
      void checkSync();
    }
  }, [isTokenValid, userData]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isWhiteVariant = whiteVariantPaths.includes(pathname);
  const noMaxWidth =
    pathname.startsWith("/listings") ||
    pathname.startsWith("/vacation-rental-management");

  const [openMenu, setOpenMenu] = useState(false);
  const { startDate, endDate } = getCurrentDates();

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav
      className={`sticky top-0 z-50 flex h-12 w-full scroll-px-4 justify-center px-4 py-6 sm:h-24 sm:py-6 ${isWhiteVariant ? "bg-black" : "bg-white"} transition-all duration-700 ${scrolled ? "bg-opacity-60" : "bg-opacity-0"}`}
    >
      <div
        className={`flex w-full items-center ${isWhiteVariant || !noMaxWidth ? "sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]" : "sm:pl-16"} scroll-px-4 items-center justify-between gap-10 lg:gap-44`}
      >
        <div className="flex w-full items-center justify-between sm:w-auto md:flex-grow">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${isWhiteVariant ? "white" : "blue"}.svg`}
              alt="CoolVacay Logo"
              className="w-[118px] sm:w-[230px]"
              priority={true}
            />
          </Link>
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src={`/menu_icon_${isWhiteVariant ? "white" : "black"}.svg`}
              alt="Menu"
              width={isWhiteVariant ? "22px" : "16px"}
            />
          </button>
        </div>
        <div className="hidden text-lg sm:flex sm:flex-grow sm:items-center sm:justify-between">
          {/* <div
            className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
          >
          <Link
            className="text-center"
            href={`/listings?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1&pageNum=1`}
          >
            Snowbird Places
          </Link>
          </div> */}
          <div></div>
          <div
            className={`flex items-center gap-5  ${isWhiteVariant ? "text-white" : "text-black"}`}
          >
            <Link className={`text-center`} href={`/contact-us`}>
              Contact Us
            </Link>
            <span className="hidden text-center lg:inline-block">•</span>{" "}
            <Link
              href="/about-us"
              className={`text-center ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              About Us
            </Link>
            <span className="hidden text-center lg:inline-block">•</span>{" "}
            {userData ? (
              <Link href="/profile/reservations" className="hidden sm:block">
                <p
                  className={`text-center ${isWhiteVariant ? "text-white" : "text-black"}`}
                >
                  My bookings
                </p>
              </Link>
            ) : null}
            {!userData ? (
              <Link href="/signin">
                <button
                  className={`flex w-[190px] items-center rounded-full px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "bg-white text-black" : "bg-primary text-white"}`}
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
                userData={userData}
                isWhiteVariant={isWhiteVariant}
              />
            )}
          </div>
        </div>
      </div>
      {openMenu && (
        <NavBardDialog
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          session={userData!}
        />
      )}
    </nav>
  );
}
