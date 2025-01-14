import HeroTextSection from "./HeroTextSection";
import { SearchCard } from "./SearchCard";
import { getLocationsList } from "~/app/(application)/actions";

export async function HeroSection() {
  const locationsList = (await getLocationsList()) ?? [];

  return (
    <main className="absolute top-24 flex w-full justify-center p-4 text-white md:top-44">
      <div className="custom-max-widths justify-between md:flex">
        <div className="flex items-center justify-end font-medium">
          <HeroTextSection />
        </div>
        <div className="mt-6 flex justify-center md:mt-0">
          <SearchCard size="big" locationsList={locationsList} />
        </div>
      </div>
    </main>
  );
}
