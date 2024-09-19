import HeroTextSection from "./HeroTextSection";
import { SearchCard } from "./SearchCard";
import { getLocationsList } from "~/app/(application)/actions";

export async function HeroSection() {
  const locationsList = (await getLocationsList()) ?? [];

  return (
    <main className="absolute top-32 text-white md:top-44">
      <div className="justify-between px-6 md:flex md:max-w-[680px] md:px-0 lg:max-w-[920px] xl:max-w-[1220px]">
        <div className="flex items-end justify-end font-medium">
          <HeroTextSection />
        </div>
        <div className="mt-6 flex justify-center md:mt-0">
          <SearchCard size="big" locationsList={locationsList} />
        </div>
      </div>
    </main>
  );
}
