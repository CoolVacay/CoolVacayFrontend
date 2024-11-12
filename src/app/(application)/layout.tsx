import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import NavBarWrapper from "../ui/components/common/Navbar/NavBar.server";
import FooterSection from "../ui/components/FooterSection";
import { type Metadata } from "next";

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
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <NavBarWrapper />
      {children}
      <FooterSection />
    </AppRouterCacheProvider>
  );
}
