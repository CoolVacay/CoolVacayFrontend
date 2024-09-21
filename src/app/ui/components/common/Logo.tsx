"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";

export function Logo({ isLogoWhite = false }: { isLogoWhite?: boolean }) {
  const siteConfigs = useSiteConfigurations();
  return (
    <Link href="/">
      <Image
        src={`${isLogoWhite ? siteConfigs.logo.white : siteConfigs.logo.color}`}
        alt={siteConfigs.logo.alt}
        width={200}
        height={50}
        sizes="(max-width: 768px) 90vw, 75vw"
        className={`w-[${Number.parseInt(siteConfigs.logo.width) - 60}px] sm:w-[${siteConfigs.logo.width}]`}
        priority={true}
      />
    </Link>
  );
}
