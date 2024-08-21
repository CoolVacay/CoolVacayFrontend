import React from 'react'
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../ui/components/common/CustomButton";
import { CustomChip, MainCard } from "~/app/ui/components/common";
import { getBlogs } from "../actions";
import dayjs from "dayjs";

async function AllBlogs() {
    const blogs = (await getBlogs())!;
    const featuredBlog = blogs.find((blog) => blog.isFeatured);
  return (
    <div className="flex w-full max-w-[1220px] flex-col items-center justify-center">
          {featuredBlog && (
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-20">
              <div className="flex max-w-full flex-col gap-5 md:max-w-[50%]">
                <CustomChip label="Featured" width={80} />
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-medium leading-tight md:text-[50px] md:leading-[67px]">
                    {featuredBlog?.title}
                  </h2>
                  <p className="mb-2 text-sm leading-[22px] text-gray-600 md:text-base md:leading-[30px]">
                    {featuredBlog?.description}
                  </p>
                  <Link href={`/blog/${featuredBlog.id}`}>
                    <CustomButton label="Read more" width={160} />
                  </Link>
                </div>
              </div>
              <div className="flex w-full md:w-auto">
                <Image
                  alt="Blog image"
                  src={featuredBlog?.thumbnailImageUrl}
                  className="hidden rounded-2xl object-cover md:inline-block md:h-auto md:w-auto"
                  width={530}
                  height={370}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}
          <div className="mt-10 grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {blogs
              .filter((blog) => blog.id !== featuredBlog?.id)
              .map((card) => {
                return (
                  <Link
                    key={card.id}
                    href={`/blog/${card.id}`}
                    className="h-full"
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
  )
}

export default AllBlogs