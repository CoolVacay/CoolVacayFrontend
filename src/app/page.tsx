import AllistingsSection from "./ui/AllistingsSection";
import BlogSection from "./ui/BlogSection";
import DiscoverSection from "./ui/DiscoverSection";
import FeaturedListingsSection from "./ui/FeaturedListingsSection";
import HeroSection from "./ui/HeroSection";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <div className="px-16">
        <FeaturedListingsSection />
        <DiscoverSection />
        <AllistingsSection />
        <BlogSection />
      </div>
    </main>
  );
}
