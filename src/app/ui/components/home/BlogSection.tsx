import Link from "next/link";
import { CustomChip, IconGenerator, MainCard } from "../common";
import { getBlogs } from "~/app/(application)/actions";
import dayjs from "dayjs";

export async function BlogSection() {
  const blogs = (await getBlogs())! ?? [];

  return (
    <section className="mt-8 flex w-full flex-col">
      <div className="flex flex-col items-center">
        <CustomChip label="Blog" width={90} />
        <h2 className="section-title !text-center">
          Latest Insights & Travel Tips from Our Blog
        </h2>
      </div>
      {blogs.length > 0 ? (
        <>
          <div className="no-scrollbar flex items-center gap-5 overflow-auto sm:flex-row sm:flex-wrap sm:justify-between">
            {blogs.map((blog, i) => {
              return (
                i < 4 && (
                  <Link
                    href={`/blog/${blog.id}`}
                    key={blog.id}
                    className="h-[340px]"
                  >
                    <MainCard
                      imageUrl={
                        blog.thumbnailImageUrl.length > 0
                          ? blog.thumbnailImageUrl
                          : "/blog_photo.webp"
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
                )
              );
            })}
          </div>
          <div className="mb-8 flex w-full justify-end">
            <Link href="/blog" className="flex items-center text-primary">
              See all blogs
              <span className="ml-2">
                <IconGenerator src="/link.svg" width="13px" alt="link icon" />
              </span>
            </Link>
          </div>
        </>
      ) : (
        <p className="mb-8 text-center">No blogs available at the moment</p>
      )}
    </section>
  );
}
