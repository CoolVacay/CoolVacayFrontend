import { revalidateFetch } from "../../../utils/api-helpers";
import type { popularCategoriesData } from "../../../(application)/definitions";
import IconGenerator from "../common/IconGenerator";
import Link from "next/link";

//TODO: remove when we get the endpoint working

// const categories = [
//     {
//       name: "Beach",
//       href: "/listings",
//       icon: <IconGenerator src="/beach_icon.svg" alt="Beach icon" width="20px" />,
//     },
//     {
//       name: "Skiing",
//       href: "/listings",
//       icon: (
//         <IconGenerator src="/skiing_icon.svg" alt="Skiing icon" width="20px" />
//       ),
//     },

//     {
//       name: "Boat Docks",
//       href: "/listings",
//       icon: (
//         <IconGenerator src="/boat_docks.svg" alt="Boatdocks icon" width="24px" />
//       ),
//     },
//     {
//       name: "Beachfront",
//       href: "/listings",
//       icon: (
//         <IconGenerator src="/beachfront.svg" alt="Beachfront icon" width="24px" />
//       ),
//     },
//     {
//       name: "Waterfront",
//       href: "/listings",
//       icon: (
//         <IconGenerator src="/waterfront.svg" alt="Waterfront icon" width="24px" />
//       ),
//     },
//     {
//       name: "Pool",
//       href: "/listings",
//       icon: <IconGenerator src="/pool.svg" alt="Pool icon" width="24px" />,
//     },
//     {
//       name: "Mountain",
//       href: "/listings",
//       icon: (
//         <IconGenerator
//           src="/mountain_icon.svg"
//           alt="Mountain icon"
//           width="20px"
//         />
//       ),
//     },
//   ];

async function getCategories() {
    try {
        const res = await revalidateFetch("categories");
        return res.json();
    } catch (error) {
        console.error("Error:", error);
        throw new Error(`Failed to fetch popular categories`);
    }
}

export default async function PopularCategories() {
    const popularCategories = (await getCategories()) as popularCategoriesData[];

    return (
        <div className="flex flex-wrap md:justify-between">
            {popularCategories.map((categorie, index) => (
                <Link key={categorie.id} href={categorie.page}>
                    <button
                        key={categorie.id}
                        className={`${index > 0 && "ml-10"} flex shrink-0 grow-0 rounded-full bg-[#F7F7F7] p-4`}
                    >
                        {
                            <span className="mr-4 flex">
                                {
                                    <IconGenerator
                                        src={categorie.iconUrl}
                                        width={categorie.width}
                                        alt="1"
                                    />
                                }
                            </span>
                        }
                        {categorie.name}
                    </button>
                </Link>
            ))}
        </div>
    );
}
