import Link from "next/link";
import { CustomChip, IconGenerator, MainCard } from "../common";
import { getBlogs } from "~/app/(application)/actions";
import dayjs from "dayjs";

export async function BlogSection() {
  const blogs = (await getBlogs())! ?? [];

  return (
    <section className="flex w-full flex-col">
      <div className="flex flex-col items-center">
        <CustomChip label="Blog" width={90}/>
        <h2 className="py-4 text-center text-[56px] leading-[67px]">
          Latest Insights & Travel Tips from Our Blog
        </h2>
      </div>
      <div className="no-scrollbar flex items-center gap-5 overflow-auto pb-10 sm:flex-row sm:flex-wrap sm:justify-between">
        {blogs.length > 0 ? (
          <>
            {blogs.slice(blogs.length - 4, blogs.length).map((blog) => {
              return (
                <Link
                  href={`/blog/${blog.id}`}
                  key={blog.id}
                  className="h-[340px]"
                >
                  <MainCard
                    imageUrl={
                      blog.thumbnailImageUrl.length > 0
                        ? blog.thumbnailImageUrl
                        : "/blog_photo.jpeg"
                    }
                    name={
                      blog.title ??
                      "How to get more bookings with Coolvacay in 2024"
                    }
                    subtitle={`${dayjs(blog.createdOn).format("MMMM D, YYYY")}  •  ${blog.readTime} read `}
                    key={blog.id}
                    isBlogCard
                  />
                </Link>
              );
            })}
            <div className="-mt-10 flex w-full justify-end">
              <Link href="/blog" className="flex items-center text-primary">
                See all blogs
                <span className="ml-2">
                  <IconGenerator src="/link.svg" width="13px" alt="link icon" />
                </span>
              </Link>
            </div>
          </>
        ) : (
          <p>No blogs available at the moment</p>
        )}
      </div>
    </section>
  );
}
