import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Image from "next/image";

export const metadata = {
  title: `${process.env.SITE_NAME ?? "CoolVacay"} | Authentication`,
  description: "Booking Platform Authentication Page",
};

export default async function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <div className="flex w-full sm:h-screen sm:items-center sm:justify-center xl:items-start">
        <div className="flex w-full justify-center p-5 sm:px-6 sm:py-10 lg:w-1/2 lg:px-8 lg:py-20">
          <div className="flex w-full max-w-[510px] justify-center">
            {children}
          </div>
        </div>
        <div className="relative hidden h-full lg:w-1/2 xl:block">
          <Image
            alt="Cool Vacay Authentication Image"
            src={`/${process.env.NEXT_PUBLIC_SITE_NAME ? process.env.NEXT_PUBLIC_SITE_NAME : "CoolVacay"}_authentication_image.jpeg`}
            fill
            priority={true}
            quality={90}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </AppRouterCacheProvider>
  );
}
