"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOut } from "~/app/(authentication)/actions";
import type { Session } from "next-auth";

import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";
import NavBardDialog from "./NavBarDialog";
import NavBarLoginButton from "./NavBarLoginButton";
import { IconGenerator } from "../IconGenerator";
import type { TUserData } from "~/app/(application)/definitions";
import { Logo } from "../Logo";

const whiteLogoPaths = [
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
  const siteConfigs = useSiteConfigurations();
  useEffect(() => {
    //server session and client session are not in sync
    //client session must follow server session,if client session is still present
    //but server session is not, then logOut
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
  const isLogoWhite = whiteLogoPaths.includes(pathname);
  const isNavBarFullWidth =
    pathname.startsWith("/listings") ||
    pathname.startsWith("/vacation-rental-management");

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav
      className={`sticky top-0 z-50 flex h-12 justify-center px-4 py-6 sm:h-20 sm:py-6 ${scrolled ? `${isLogoWhite ? "bg-black bg-opacity-60 transition-all duration-700" : "bg-white"}` : "bg-opacity-0 transition-all duration-700"}`}
    >
      <div
        className={`container ${isLogoWhite || !isNavBarFullWidth ? "custom-max-widths" : "sm:pl-16"} scroll-px-4 justify-between gap-10`}
      >
        <div className="container justify-between sm:w-auto md:flex-grow">
          <Logo isLogoWhite={isLogoWhite} />
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src={`/menu_icon_${isLogoWhite ? "white" : "black"}.svg`}
              alt="Menu"
              width={isLogoWhite ? "28px" : "18px"}
            />
          </button>
        </div>
        <div className="text-md hidden sm:flex sm:items-center sm:justify-between">
          <div
            className={`flex items-center gap-5  ${isLogoWhite ? "text-white" : "text-black"}`}
          >
            {siteConfigs.navBar.links.map((link) => {
              return (
                <Fragment key={link.href}>
                  <Link
                    className={`text-center text-base sm:text-sm lg:text-base ${isLogoWhite ? "text-white" : "text-black"}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                  <span className="hidden text-center lg:inline-block">•</span>{" "}
                </Fragment>
              );
            })}
            {userData ? (
              <Link href="/profile/reservations" className="hidden sm:block">
                <p
                  className={`text-center text-base sm:text-sm lg:text-base  ${isLogoWhite ? "text-white" : "text-black"}`}
                >
                  My bookings
                </p>
              </Link>
            ) : null}
            {!userData ? (
              <Link href="/signin" className="flex shrink-0">
                <button
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm  ${isLogoWhite ? "bg-white text-black" : "bg-primary text-white"}`}
                >
                  <span className="flex">{`Log In `}</span>
                  <span className="hidden lg:block lg:flex">or Sign Up</span>
                  <span className="ml-2 w-7 lg:w-8">
                    <IconGenerator
                      alt="avatar icon"
                      src={`/avatar_${isLogoWhite ? "white" : "blue"}.svg`}
                      className="w-6 lg:w-7"
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
          siteConfigs={siteConfigs}
          toggleMenu={toggleMenu}
          session={userData!}
        />
      )}
    </nav>
  );
}
