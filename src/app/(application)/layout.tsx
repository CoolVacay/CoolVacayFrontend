import "~/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import NavBarWrapper from "../ui/components/common/Navbar/NavBar.server";
import FooterSection from "../ui/components/FooterSection";
import MuiXLicense from "../MuiXLicense";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { SearchParamsProvider } from "~/context/SearchParamsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoolVacay",
  description: "Cool Vacay Booking Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <NavBarWrapper />
            <SearchParamsProvider>{children}</SearchParamsProvider>
            <FooterSection />
            <MuiXLicense />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
