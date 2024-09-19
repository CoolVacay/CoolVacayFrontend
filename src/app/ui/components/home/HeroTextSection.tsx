"use client";

import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";

export default function HeroTextSection() {
  const heroTextSiteConfigs = useSiteConfigurations().home;

  return (
    <div className="flex flex-col justify-center gap-5 lg:items-start">
      {heroTextSiteConfigs?.motto ? (
        <div className="hidden h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm md:flex">
          <p className="text-white">{heroTextSiteConfigs.motto}</p>
        </div>
      ) : null}
      {heroTextSiteConfigs?.header1 ? (
        <h1 className="text-center text-[36px] leading-[43px] sm:text-left md:text-[80px] md:leading-[80px]">
          {heroTextSiteConfigs.header1}
        </h1>
      ) : null}
      <div className="hidden text-xl leading-[30px] tracking-[0.16px] lg:block">
        {heroTextSiteConfigs?.paragraph1 ? (
          <p className="text-[16px]">{heroTextSiteConfigs.paragraph1}</p>
        ) : null}
        {heroTextSiteConfigs.paragraph2 ? (
          <p className="text-[16px]">
            Explore, compare, and uncover your dream location effortlessly.
          </p>
        ) : null}
      </div>
    </div>
  );
}
