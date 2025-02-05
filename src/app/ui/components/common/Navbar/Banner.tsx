"use client";
import React from "react";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";
import { DEFAULT_BANNER, DefaultBanner } from "./DefaultBanner";
import Link from "next/link";

function Banner() {
  const bannerInfo = useSiteConfigurations().banner;

  if (DEFAULT_BANNER.allowMasterOverride === true)
    return (
      <div className="relative flex h-12 items-center justify-center gap-5 bg-primary">
        <DefaultBanner />
      </div>
    );

  if (!bannerInfo?.isBannerActive) return null;

  return (
    <div className="relative flex h-12 items-center justify-center gap-5 bg-primary">
      {bannerInfo.shouldOverrideBanner ? (
        <>
          <p className="mt-2 text-xl text-black">
            {bannerInfo.overrideBanner.text}
          </p>
          {bannerInfo.overrideBanner?.ctaButton && (
            <Link href={bannerInfo.overrideBanner.ctaButton.href}>
              <button className="rounded-xl bg-white px-2 py-1 font-bold text-black">
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
