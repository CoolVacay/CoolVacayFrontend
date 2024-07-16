"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookingIcon } from "public/BookingIcon";
import { PersonalActiveIcon } from "public/PersonalActiveIcon";
import { SecurityIcon } from "public/SecurityIcon";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      name: "Personal Information",
      href: "/profile",
      icon: (isActive: boolean) => (
        <PersonalActiveIcon color={isActive ? "#29ABE2" : "#212529"} />
      ),
    },
    {
      name: "Reservation History",
      href: "/profile/reservations",
      icon: (isActive: boolean) => (
        <BookingIcon color={isActive ? "#29ABE2" : "#212529"} />
      ),
    },
    {
      name: "Security",
      href: "/profile/security",
      icon: (isActive: boolean) => (
        <SecurityIcon color={isActive ? "#29ABE2" : "#212529"} />
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[56px] cursor-pointer items-center gap-2 p-5 font-medium hover:bg-primary/[.10]
              ${pathname === link.href ? "bg-primary/[.10] text-primary" : ""}
            `}
          >
            {link.icon(pathname === link.href)}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
