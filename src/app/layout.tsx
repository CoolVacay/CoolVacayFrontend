import "~/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";

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
      <body className={`${inter.className}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {<NavBar />}
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
