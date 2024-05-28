"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";

import IconGenerator from "../IconGenerator";
import NavBarLoginButton from "./NavBarLoginButton";

export default function NavBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const isWhiteVariant = pathname === "/";

  return (
    <nav
      className={`${isWhiteVariant ? "absolute" : "block"} z-10 flex w-full items-center justify-center px-16 py-6`}
    >
      <div className="flex h-12 w-full items-center gap-44">
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
        <div className="flex items-center gap-5 ">
          <Link href="/rental-income-estimator">
            <p
              className={`text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              Vacation Rental Management
            </p>
          </Link>
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
    </nav>
  );
}
