import "~/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import NavBarWrapper from "../ui/components/common/Navbar/NavBar.server";
import FooterSection from "../ui/components/FooterSection";
import MuiXLicense from "../MuiXLicense";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteConfigurations } from "./actions";
import { SiteConfigurationProvider } from "~/context/SiteConfigurationsContext";

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
    <html lang="en">
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
