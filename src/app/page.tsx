import AllistingsSection from "./ui/AllistingsSection";
import DealsSection from "./ui/DealsSection";
import FeaturedListingsSection from "./ui/FeaturedListingsSection";
import HeroSection from "./ui/HeroSection";
import NewListingsSection from "./ui/NewListingsSection";

export default async function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedListingsSection />
      <DealsSection />
      <NewListingsSection />
      <AllistingsSection />
    </main>
  );
}
