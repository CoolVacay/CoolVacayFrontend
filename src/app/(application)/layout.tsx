import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import NavBarWrapper from "../ui/components/common/Navbar/NavBar.server";
import FooterSection from "../ui/components/FooterSection";

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
