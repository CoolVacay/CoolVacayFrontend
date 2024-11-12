import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteConfigurationProvider } from "~/context/SiteConfigurationsContext";

import "~/styles/globals.css";
import { type Metadata } from "next";
import { getSiteConfigurations } from "./(application)/actions";
import MuiXLicense from "./MuiXLicense";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `${process.env.SITE_NAME ?? "CoolVacay"} | %s`,
    default: `${process.env.SITE_NAME ?? "CoolVacay"}`,
  },
  description: `${process.env.SITE_NAME ?? "CoolVacay"} Booking Platform`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfigurations = (await getSiteConfigurations())!;
  return (
    <html lang="en" className={process.env.SITE_NAME}>
      <head>
        <link
          rel="icon"
          href={siteConfigurations.config.favicon.url}
          sizes={siteConfigurations.config.favicon.width}
        />
      </head>

      <GoogleAnalytics gaId="G-GT7N6G5LGF" />
      <SpeedInsights />
      <body className={`${inter.className} flex h-full w-full flex-col`}>
        <SiteConfigurationProvider siteConfigurations={siteConfigurations}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {children}
            <MuiXLicense />
          </AppRouterCacheProvider>
        </SiteConfigurationProvider>
      </body>
    </html>
  );
}
