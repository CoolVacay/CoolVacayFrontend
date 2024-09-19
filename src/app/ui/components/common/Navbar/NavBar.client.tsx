"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOut } from "~/app/(authentication)/actions";

import { IconGenerator } from "../IconGenerator";
import NavBardDialog from "./NavBarDialog";
import NavBarLoginButton from "./NavBarLoginButton";
import type { TUserData } from "~/app/(application)/definitions";
import type { Session } from "next-auth";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";
import Image from "next/image";

const whiteVariantPaths = [
  "/",
  "/about-us",
  "/terms-and-conditions",
  "/privacy-policy",
  "/accessibility-statement",
];

export default function NavBar({
  userData,
  session,
}: {
  userData?: TUserData["profile"] | null;
  session: Session | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const navBarConfigurations = useSiteConfigurations().navBar;
  console.log(navBarConfigurations, "siteee12123s");

  useEffect(() => {
    if (session && !userData) {
      const checkSync = async () => {
        await logOut();
      };
      void checkSync();
    }
  }, [userData, session]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (window.scrollY > 1) {
      setScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isLogoWhite = whiteVariantPaths.includes(pathname);
  const noMaxWidth =
    pathname.startsWith("/listings") ||
    pathname.startsWith("/vacation-rental-management");

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav
      className={`sticky top-0 z-50 flex h-12 w-full justify-center px-4 py-6 sm:h-20 sm:py-6 ${scrolled ? `${isLogoWhite ? "bg-black bg-opacity-60 transition-all duration-700" : "bg-white"}` : "bg-opacity-0 transition-all duration-700"}`}
    >
      <div
        className={`flex w-full items-center ${isLogoWhite || !noMaxWidth ? "sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]" : "sm:pl-16"} scroll-px-4 items-center justify-between gap-10 lg:gap-44`}
      >
        <div className="flex w-full items-center justify-between sm:w-auto md:flex-grow">
          <Link href="/">
            <Image
              src={`${isLogoWhite ? navBarConfigurations.logo.url : navBarConfigurations.logo.url}`}
              alt={navBarConfigurations.logo.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 90vw, 75vw"
              className={`w-[${navBarConfigurations.logo.width}] sm:w-[${navBarConfigurations.logo.width}]`}
              priority={true}
            />
          </Link>
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src={`/menu_icon_${isLogoWhite ? "white" : "black"}.svg`}
              alt="Menu"
              width={isLogoWhite ? "22px" : "16px"}
            />
          </button>
        </div>
        <div className="text-md hidden sm:flex sm:items-center sm:justify-between">
          <div
            className={`flex items-center gap-5  ${isLogoWhite ? "text-white" : "text-black"}`}
          >
            {navBarConfigurations.links.map((link, index) => {
              return (
                <Fragment key={link.href}>
                  <Link
                    className={`text-center ${isLogoWhite ? "text-white" : "text-black"}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                  {index < navBarConfigurations.links.length - 1 ? (
                    <span className="hidden text-center lg:inline-block">
                      •
                    </span>
                  ) : null}
                </Fragment>
              );
            })}
            {userData ? (
              <Link href="/profile/reservations" className="hidden sm:block">
                <p
                  className={`text-center ${isLogoWhite ? "text-white" : "text-black"}`}
                >
                  My bookings
                </p>
              </Link>
            ) : null}
            {!userData ? (
              <Link href="/signin">
                <button
                  className={`flex w-[190px] items-center rounded-full px-[14px] py-[6px] text-sm font-normal  ${isLogoWhite ? "bg-white text-black" : "bg-primary text-white"}`}
                >
                  Log In or Sign Up
                  <span className="ml-2">
                    <IconGenerator
                      alt="avatar icon"
                      src={`/avatar_${isLogoWhite ? "white" : "blue"}.svg`}
                      width="32px"
                    />
                  </span>
                </button>
              </Link>
            ) : (
              <NavBarLoginButton
                userData={userData}
                isLogoWhite={isLogoWhite}
              />
            )}
          </div>
        </div>
      </div>
      {openMenu && (
        <NavBardDialog
          openMenu={openMenu}
          navBarConfigurations={navBarConfigurations}
          toggleMenu={toggleMenu}
          session={userData!}
        />
      )}
    </nav>
  );
}
