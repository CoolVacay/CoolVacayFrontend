import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../ui/components/common/CustomButton";
import { CustomChip, MainCard } from "~/app/ui/components/common";
import { getBlogs } from "../actions";
import dayjs from "dayjs";

async function Page() {
  const blogs = (await getBlogs())!;
  const featuredBlog = blogs.find((blog) => blog.isFeatured);

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          {featuredBlog && (
            <div className="flex items-center gap-20">
              <div className="flex flex-col gap-5">
                <CustomChip label="Featured" width={80} />
                <div className="flex flex-col gap-3">
                  <h2 className="text-[50px] font-medium leading-[67px]">
                    {featuredBlog?.title}
                  </h2>
                  <p className="mb-2 leading-[30px] text-gray-600">
                    {featuredBlog?.description.substr(0, 350) + "\u2026"}
                  </p>
                  <Link href={`/blog/${featuredBlog.id}`}>
                    <CustomButton label="Read more" width={160} />
                  </Link>
                </div>
              </div>
              <div className="flex h-[370px] w-[530px] shrink-0">
                <Image
                  alt="Blog image"
                  src={featuredBlog?.thumbnailImageUrl}
                  className="rounded-2xl"
                  quality={90}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    height: "370px",
                    width: "530px",
                  }}
                />
              </div>
            </div>
          )}
          <div className="mt-10 grid grid-cols-4 gap-8 py-10">
            {blogs
              .filter((blog) => blog.id !== featuredBlog?.id)
              .map((card) => {
                return (
                  <Link
                    key={card.id}
                    href={`/blog/${card.id}`}
                    className="h-82"
                  >
                    <MainCard
                      imageUrl={card.thumbnailImageUrl}
                      name={card.title}
                      subtitle={`${dayjs(card.createdOn).format("MMMM d, YYYY")}  •  ${card.readTime} min`}
                      key={card.id}
                      isBlogCard
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
