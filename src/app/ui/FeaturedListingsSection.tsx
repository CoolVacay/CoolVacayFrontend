import IconGenerator from "./components/common/IconGenerator";
import MainCard from "./components/MainCard/MainCard";

const categories = [
  {
    name: "Beach",
    href: "/listings",
    icon: <IconGenerator src="/beach_icon.svg" alt="Beach icon" width="20px" />,
  },
  {
    name: "Skiing",
    href: "/listings",
    icon: (
      <IconGenerator src="/skiing_icon.svg" alt="Skiing icon" width="20px" />
    ),
  },

  {
    name: "Boat Docks",
    href: "/listings",
    icon: (
      <IconGenerator src="/boat_docks.svg" alt="Boatdocks icon" width="24px" />
    ),
  },
  {
    name: "Beachfront",
    href: "/listings",
    icon: (
      <IconGenerator src="/beachfront.svg" alt="Beachfront icon" width="24px" />
    ),
  },
  {
    name: "Waterfront",
    href: "/listings",
    icon: (
      <IconGenerator src="/waterfront.svg" alt="Waterfront icon" width="24px" />
    ),
  },
  {
    name: "Pool",
    href: "/listings",
    icon: <IconGenerator src="/pool.svg" alt="Pool icon" width="24px" />,
  },
  {
    name: "Mountain",
    href: "/listings",
    icon: (
      <IconGenerator
        src="/mountain_icon.svg"
        alt="Mountain icon"
        width="20px"
      />
    ),
  },
];

export default async function FeaturedListingsSection() {
  return (
    <section className="flex-col pb-10">
      <h1 className="py-7 text-[28px]">Popular Categories</h1>
      <div className="flex flex-wrap md:justify-between">
        {categories.map(
          (categorie: Record<string, string | JSX.Element>, index: number) => (
            <button
              key={categorie.name as string}
              className={`${index > 0 && "ml-10"} flex shrink-0 grow-0 rounded-full bg-[#F7F7F7] p-5`}
            >
              {<span className="mr-4 shrink-0">{categorie.icon}</span>}
              {categorie.name}
            </button>
          ),
        )}
      </div>
      <h1 className="py-9 text-[28px]">Featured Listings</h1>
      <div className="flex justify-evenly gap-5	">
        {Array.from({ length: 3 }, (_, i) => i + 1).map((card) => {
          return (
            <MainCard
              title="Swiss Mountain Village"
              subtitle="Blowing Rock, North Carolina"
              key={card}
              imgHeight={240}
              src="/cardImage.png"
            />
          );
        })}
      </div>
    </section>
  );
}
