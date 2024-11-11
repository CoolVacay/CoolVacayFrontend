"use client";

import React from "react";
import Link from "next/link";
import { IconGenerator } from "./common";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";
import Image from "next/image";

function FooterSection() {
  const siteConfigs = useSiteConfigurations();
  const footerSiteConfigs = siteConfigs.footer;

  const popularSearchLinks = footerSiteConfigs.popularSearchLinks;
  const quickLinks = footerSiteConfigs.quickLinks;
  const staticPages = footerSiteConfigs.staticPages;
  const discoverLinks = footerSiteConfigs.discoverLinks;

  return (
    <footer
      className="mt-auto flex flex-col p-4 sm:px-[72px] sm:pt-14"
      style={{ borderTop: "1px solid rgba(173, 181, 189, 0.5)" }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-28">
        <div className="flex flex-col gap-7">
          <div className="-mt-6 py-3">
            <Image
              src={siteConfigs.logo.color}
              alt={siteConfigs.logo.alt}
              width={250}
              height={50}
              sizes="(max-width: 768px) 90vw, 75vw"
              className={`w-[${Number.parseInt(siteConfigs.logo.width) - 60}px] sm:w-[${siteConfigs.logo.width}]`}
              priority={true}
            />
          </div>
          <div className="flex gap-10 max-[430px]:flex-col sm:w-[430px] sm:flex-row">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-primary-grey400">
                  Call Customer Experience
                </h2>
                <p className="text-[15px] font-semibold">
                  <Link href={`tel:${footerSiteConfigs.phone}`}>
                    {footerSiteConfigs.phone}
                  </Link>
                </p>
              </div>
              {footerSiteConfigs.socials.length > 0 && (
                <div>
                  <p className="text-[15px] font-semibold">
                    Follow Us On Social Media
                  </p>
                  <div className="flex items-center gap-7">
                    {footerSiteConfigs.socials.map((social, index) => {
                      return (
                        <Link key={index} href={social.href}>
                          <IconGenerator
                            src={`/${social.name}_icon.svg`}
                            width={social.name === "facebook" ? "10px" : "13px"}
                            alt={`${siteConfigs.config.siteName} facebook page`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-primary-grey400">
                Email Customer Experience
              </h2>
              <p className="text-[15px] font-semibold">
                <a href="mailto:vacay@coolvacay.com">
                  {footerSiteConfigs.email}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:w-full sm:grid-cols-3 sm:justify-between">
          <div className="flex flex-col gap-5 lg:ml-auto">
            {popularSearchLinks.length > 0 && (
              <>
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
              </>
            )}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            {quickLinks.length > 0 && (
              <>
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
              </>
            )}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            {discoverLinks.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-6 text-sm sm:flex-row">
        <h2>
          © {siteConfigs.config.siteName} 2024
          <span className="text-primary-grey400"> - All rights reserved</span> |
          Site Designed & Managed by{" "}
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500 underline"
            href={"https://www.coolvacay.com/"}
          >
            CoolVacay
          </Link>
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
