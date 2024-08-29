import React from "react";
import Link from "next/link";
import { IconGenerator } from "./common";

const popularSearchLinks = [
  { name: "Beach Properties", href: "/listings?category=Beach&numberOfGuests=1&pageNum=1" },
  { name: "Beachfront Properties", href: "/listings?category=Beachfront&numberOfGuests=1&pageNum=1" },
  { name: "Mountain Properties", href: "/listings?category=Mountain&numberOfGuests=1&pageNum=1" },
  { name: "Pool Properties", href: "/listings?category=Pool&numberOfGuests=1&pageNum=1" }
];
const quickLinks = [
  { name: "About Company", href: "/about-us" },
  { name: "Blog", href: "/blog" },
  { name: "Policies", href: "/privacy-policy" },
  { name: "Contact Us", href: "/contact-us" },
];
const staticPages = [
  { name: "Privacy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms-and-conditions" },
  { name: "Accessibility", href: "/accessibility-statement" },
];
const discoverLinks = [
  { name: "Florida Listings", href: "/listings?numberOfGuests=1&pageNum=1&match=Florida" },
  { name: "North Carolina Listings", href: "/listings?numberOfGuests=1&pageNum=1&match=North Carolina" },
  { name: "Maryland Listings", href: "/listings?numberOfGuests=1&pageNum=1&match=Maryland" },
  { name: "Virginia Listings", href: "/listings?numberOfGuests=1&pageNum=1&match=Virginia" }
];

function FooterSection() {
  return (
    <footer
      className="mt-auto flex flex-col p-4 sm:px-[72px] sm:pt-14"
      style={{ borderTop: "1px solid rgba(173, 181, 189, 0.5)" }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-28">
        <div className="flex flex-col gap-7">
          <div className="py-3 -mt-6">
            <IconGenerator
              src="/cool_vacay_logo_blue.svg"
              width="180px"
              alt="Coolvacay logo"
            />
          </div>
          <div className="flex gap-10 max-[430px]:flex-col sm:w-[400px] sm:flex-row">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-primary-grey400">
                  Total Free Customer Care
                </h2>
                <p className="text-[15px] font-semibold"><a href="tel:315-434-2324">(315) 434-2324</a></p>
              </div>
              <p className="text-[15px] font-semibold">
                Follow us on social media
              </p>
              <div className="flex items-center gap-7">
                <Link href={'#'}>
                  <IconGenerator
                    src="/facebook_icon.svg"
                    width="10px"
                    alt="CoolVacay Facebook page"
                  />
                </Link>
                <Link href={'https://www.facebook.com/CoolVacay'}>
                  <IconGenerator
                    src="/instagram_icon.svg"
                    width="13px"
                    alt="CoolVacay Instagram page"
                  />
                </Link>
                <Link href={'https://www.instagram.com/coolvacaynow'}>
                  <IconGenerator
                    src="/linkedin_icon.svg"
                    width="13px"
                    alt="CoolVacay Linkedin page"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-primary-grey400">
                Need Live Support?
              </h2>
              <p className="text-[15px] font-semibold">vacay@coolvacay.com</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:w-full sm:grid-cols-3 sm:justify-between">
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Popular Search</h2>
            {popularSearchLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-sm text-primary-grey400"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Quick Links</h2>
            {quickLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-sm text-primary-grey400"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Discover</h2>
            {discoverLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-sm text-primary-grey400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-6 text-sm sm:flex-row">
        <h2>
          © Coolvacay 2024
          <span className="text-primary-grey400"> - All rights reserved</span>
        </h2>
        <div className="flex gap-2">
          {staticPages.map((page, index) => (
            <React.Fragment key={page.name}>
              <Link
                href={page.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary-grey400"
              >
                {page.name}
              </Link>
              {index < staticPages.length - 1 && (
                <span className="text-primary-grey400"> · </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
