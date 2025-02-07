"use client";
import React from "react";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";
import { DEFAULT_BANNER, DefaultBanner } from "./DefaultBanner";
import Link from "next/link";

function Banner() {
  const bannerInfo = useSiteConfigurations().banner;

  // When the master override is allowed, display the default banner
  if (DEFAULT_BANNER.allowMasterOverride === true)
    return (
      <div className="relative flex flex-wrap items-center justify-center gap-2 bg-primary px-4 py-2 sm:gap-5 md:py-3">
        <DefaultBanner />
      </div>
    );

  // If the banner is not active, render nothing
  if (!bannerInfo?.isBannerActive) return null;

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-2 bg-primary px-4 py-2 sm:gap-5 md:py-3">
      {bannerInfo.shouldOverrideBanner ? (
        <>
          <p className="text-sm text-black md:text-xl">
            {bannerInfo.overrideBanner.text}
          </p>
          {bannerInfo.overrideBanner?.ctaButton && (
            <Link href={bannerInfo.overrideBanner.ctaButton.href}>
              <button className="rounded-xl bg-white px-2 py-1 font-bold text-black transition duration-100 hover:bg-blue-500 hover:text-white md:px-4 md:py-2">
                {bannerInfo.overrideBanner.ctaButton.label}
              </button>
            </Link>
          )}
        </>
      ) : (
        <DefaultBanner />
      )}
    </div>
  );
}

export default Banner;
