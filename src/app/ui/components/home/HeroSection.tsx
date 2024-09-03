import { SearchCard } from "./SearchCard";
import { getLocationsList } from "~/app/(application)/actions";

export async function HeroSection() {
  const locationsList = (await getLocationsList())!;

  return (
    <main className="absolute top-32 text-white md:top-44">
      <div className="justify-between px-6 md:flex md:max-w-[680px] md:px-0 lg:max-w-[920px] xl:max-w-[1220px]">
        <div className="flex items-end justify-end font-medium">
          <div className="flex flex-col justify-center gap-5 lg:items-start">
            <div className="hidden h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm md:flex">
              <p className="text-white">Making Dreams a Reality</p>
            </div>
            <h1 className="text-center text-[36px] leading-[43px] sm:text-left md:text-[80px] md:leading-[80px]">
              Find Your Perfect Vacation
            </h1>
            <div className="hidden text-xl leading-[30px] tracking-[0.16px] lg:block">
              <p className="text-[16px]">
                Your personalized destination discovery platform.
              </p>
              <p className="text-[16px]">
                Explore, compare, and uncover your dream location effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:mt-0">
          <SearchCard size="big" locationsList={locationsList} />
        </div>
      </div>
    </main>
  );
}
