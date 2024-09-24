"use client";

import { createContext, useContext } from "react";
import type { IReadOnlySiteConfigurationProperties } from "~/app/(application)/definitions";

const SiteConfigurationContext = createContext<
  IReadOnlySiteConfigurationProperties | undefined
>(undefined);

export const SiteConfigurationProvider = ({
  siteConfigurations,
  children,
}: {
  siteConfigurations: IReadOnlySiteConfigurationProperties;
  children: React.ReactNode;
}) => {
  return (
    <SiteConfigurationContext.Provider value={siteConfigurations}>
      {children}
    </SiteConfigurationContext.Provider>
  );
};

export const useSiteConfigurations = () => {
  const context = useContext(SiteConfigurationContext);
  if (!context) {
    throw new Error(
      "useSiteConfigurations must be used within a SiteConfigurationsProvider",
    );
  }
  return context;
};
