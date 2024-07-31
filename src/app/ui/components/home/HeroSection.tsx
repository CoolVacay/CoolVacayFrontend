import { SearchCard } from "./SearchCard";
import { getLocationsList } from "~/app/(application)/actions";

export async function HeroSection() {
  const locationsList = (await getLocationsList())!;
  return (
    <main className="absolute top-44 text-white">
      <div className="flex max-w-[1220px] justify-between">
        <div className="flex items-end justify-end font-medium">
          <div className="flex flex-col items-start gap-5">
            <div className="flex h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm">
              <p className="text-white">Making dreams a reality</p>
            </div>
            <h1 className="text-[80px] leading-[80px]">
              Find your perfect place now
            </h1>
            <div className="text-xl leading-[30px] tracking-[0.16px]">
              <h1 className="text-[16px]">Your personalized destination discovery platform.</h1>
              <h2 className="text-[16px]">
                Explore, compare, and uncover your dream location effortlessly.
              </h2>
            </div>
          </div>
        </div>
        <SearchCard size="big" locationsList={locationsList} />
      </div>
    </main>
  );
}
