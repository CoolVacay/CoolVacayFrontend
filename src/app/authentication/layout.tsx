import Image from "next/image";

export const metadata = {
  title: "CoolVacay | Authentication",
  description: "Cool Vacay Booking Platform Authentication Page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white md:items-start">
      <div className="flex h-full w-full items-center justify-center px-10 md:w-1/2 md:px-52">
        {children}
      </div>
      <div className="relative h-full w-1/2">
        {
          <Image
            alt="Cool Vacay Sign In Background Image"
            src="/signInImage.png"
            className="invisible md:visible"
            fill
            quality={100}
          />
        }
      </div>
    </div>
  );
}
