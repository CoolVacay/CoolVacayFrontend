import Image from "next/image";
import Link from "next/link";
import { CustomChip } from "../common";
import { getBlogs } from "~/app/(application)/actions";

export async function DiscoverSection() {
  const blogs = (await getBlogs())! ?? [];
  const featuredBlog = blogs.find((blog) => blog.isFeatured);

  return (
    <section className="flex grow-0 flex-col sm:py-8 lg:max-h-[680px] lg:shrink-0 lg:flex-row lg:gap-12">
      <div className="hidden h-[530px] w-full overflow-hidden rounded-[30px] md:relative md:block md:shrink-0 lg:flex lg:h-auto lg:w-[492px]">
        <Image
          src={`${featuredBlog?.thumbnailImageUrl ?? "/discover_photo.png"}`}
          alt="Discover more destinations"
          width={0}
          height={0}
          sizes={"60vw"}
          style={{ objectFit: "cover" }}
          className="h-[550px] w-full  rounded-[30px] md:absolute md:bottom-10 lg:bottom-0 lg:flex lg:h-full lg:w-[492px]"
        />
      </div>
      <div className="flex flex-col gap-0 lg:gap-3 xl:flex xl:grow-0">
        <div className="mt-2 flex justify-center sm:mt-0 lg:justify-start">
          <CustomChip label="Discover" width={90} />
        </div>
        <h2 className="section-title">
          {featuredBlog?.title ?? `Explore vacation rentals with beach access`}
        </h2>
        <p className="text-justify text-sm leading-6 text-[#020101]/[.60] lg:text-lg">
          {featuredBlog?.description}
        </p>
        <div className="flex justify-center lg:justify-start">
          <Link
            href={`/blog`}
            className="mt-6 flex w-40 items-center justify-center rounded-[48px] bg-primary px-6 py-4 text-white lg:mt-0"
          >
            View Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
