import Image from "next/image";
import SearchCard from "./SearchCard";

export default async function HeroSection() {
  return (
    <div className="flex relative h-[714px] w-full flex-shrink-0 items-center text-white">
      <Image
        alt="Coolvacay background image"
        src="/landing_background.png"
        quality={100}
        fill
        priority={true}
        sizes="100vw"
        style={{
          objectFit: "cover",
          filter: "brightness(60%)",
          zIndex: -1,
        }}
      />
      <div className="flex justify-between w-full px-14">
        <div className="flex w-[857px] items-end justify-end p-2.5 font-medium">
          <div className="flex flex-col items-start gap-5">
            <div className="flex h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm">
              <p className="text-white">Making dreams a reality</p>
            </div>
            <h1 className="text-[80px] leading-[80px]">
              Find your perfect place now
            </h1>
            <div className="text-xl leading-[30px] tracking-[0.16px]">
              <p>Your personalized destination discovery platform.</p>
              <p>
                Explore, compare, and uncover your dream location effortlessly.
              </p>
            </div>
          </div>
        </div>
        <SearchCard />
      </div>
    </div>
  );
}
