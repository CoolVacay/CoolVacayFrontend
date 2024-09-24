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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoolVacay",
  description: "Cool Vacay Booking Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfigurations = (await getSiteConfigurations())!;

  return (
    <html lang="en" className={process.env.SITE_NAME}> 
    {/* Change the className above to switch color palette. The classname above must be predefined in the tailwindconfig file */}
      <GoogleAnalytics gaId="G-GT7N6G5LGF"/>
      <body className={`${inter.className} w-full flex h-full flex-col`}>
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
