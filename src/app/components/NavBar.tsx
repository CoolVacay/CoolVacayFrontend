"use client";
import Image from "next/image";

const urlsWithoutNavBar = ["authentication"];

function NavBar() {
  console.log(window?.location?.pathname.split("/")[1] ?? "");
  const showNavBar = !urlsWithoutNavBar.includes(
    window?.location?.pathname.split("/")[1] ?? "",
  );
  return (
    showNavBar && (
      <div className="absolute z-30 flex w-full flex-col items-center justify-start bg-transparent px-6 py-0">
        <div className="flex w-11/12 items-center justify-between bg-transparent p-8 text-white">
          <Image
            src="/coolVacayLogo.svg"
            alt="CoolVacay Logo"
            width={250}
            height={50}
          />
          <div className="flex gap-5">
            <h1>Listed Places</h1>
            <h1>Offers</h1>
          </div>
          <div className="flex gap-5">
            <h1>Vacation Rental Management</h1>
            <h1>signin/signup</h1>
          </div>
        </div>
      </div>
    )
  );
}

export default NavBar;
