import Image from "next/image";
import Link from "next/link";
import { CustomChip } from "../common";
import { getBlogs } from "~/app/(application)/actions";

export async function DiscoverSection() {
  const blogs = (await getBlogs())!;
  const featuredBlog = blogs.find((blog) => blog.isFeatured);
  return (
    <section className="flex grow-0 flex-col gap-12 py-14 lg:max-h-[680px] lg:shrink-0 lg:flex-row">
      <div className="hidden md:flex md:shrink-0 md:items-center md:justify-center">
        <Image
          src={`${featuredBlog?.thumbnailImageUrl ?? "/discover_photo.png"}`}
          alt="Discover more destinations"
          width={492}
          height={460}
          style={{
            objectFit: "cover",
          }}
          className="rounded-[30px]"
        />
      </div>
      <div className="flex flex-col gap-2 lg:gap-3 xl:flex xl:grow-0">
        <div className="flex justify-center lg:justify-start">
          <CustomChip label="Discover" width={90} />
        </div>
        <h2 className="md:leading-80 desktop:text-[46px] text-center text-[32px] leading-[47px] sm:text-left sm:font-semibold">
          {featuredBlog?.title ?? `Explore vacation rentals with beach access`}
        </h2>
        <p className="lg:text-lg font-400 text-justify text-sm leading-6 text-[#020101]/[.60]">
          {featuredBlog?.description}
        </p>
        <div className="flex justify-center lg:justify-start">
          <Link
            href={`/blog`}
            className="flex w-40 items-center justify-center rounded-[48px] bg-primary px-6 py-4 text-white"
          >
            View Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
