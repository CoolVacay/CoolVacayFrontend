import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@mui/material/styles";
import { SiteConfigurationProvider } from "~/context/SiteConfigurationsContext";

import NavBarWrapper from "../ui/components/common/Navbar/NavBar.server";
import FooterSection from "../ui/components/FooterSection";
import MuiXLicense from "../MuiXLicense";
import theme from "../../theme";
import "~/styles/globals.css";
import { getSiteConfigurations } from "./actions";
import { type Metadata } from "next";

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
      {/* Change the className above to switch color palette. The classname above must be predefined in the tailwindconfig file */}
      <GoogleAnalytics gaId="G-GT7N6G5LGF" />
      <body className={`${inter.className} flex h-full w-full flex-col`}>
        <SiteConfigurationProvider siteConfigurations={siteConfigurations}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <NavBarWrapper />
              {children}
              <FooterSection />
              <MuiXLicense />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SiteConfigurationProvider>
      </body>
    </html>
  );
}
