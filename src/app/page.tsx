import AllistingsSection from "./components/AllistingsSection";
import DealsSection from "./components/DealsSection";
import FeaturedListingsSection from "./components/FeaturedListingsSection";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import NewListingsSection from "./components/NewListingsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedListingsSection />
      <DealsSection />
      <NewListingsSection />
      <AllistingsSection />
      <FooterSection />
    </div>
  );
}
