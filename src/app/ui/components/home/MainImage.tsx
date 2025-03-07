"use client";

import Image from "next/image";
import React from "react";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";

function MainImage() {
  const homeConfigs = useSiteConfigurations().config;

  return (
    <div className="absolute flex h-lvh w-full sm:h-[714px]">
      <Image
        alt="Main background image"
        src={homeConfigs.main_image ?? ""}
        quality={0}
        fill
        priority={true}
        style={{
          position: "absolute",
          objectFit: "cover",
          filter: "brightness(50%)",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default MainImage;
