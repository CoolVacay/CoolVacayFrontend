import Image from "next/image";

export default function StaticPageWrapper({
  children,
  img,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  img: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
}) {
  return (
    <main className="flex flex-col">
      <div className={`relative -mt-[96px] flex h-[588px]`}>
        <div className={`absolute flex h-[588px] w-full`}>
          <Image
            alt={img.alt}
            src={img.src}
            quality={50}
            fill
            priority={true}
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(40%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="my-16 flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="absolute top-0 text-white">
            <div className="flex max-w-[1220px] items-center justify-center py-56">
              <div className="w-full">
                <h1 className="mb-8 text-[80px] font-medium leading-[80px] tracking-tight">
                  {title}
                </h1>
                <h6 className="text-center text-xl leading-[30px]">
                  {subtitle}
                </h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 text-justify text-[#676D73]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
