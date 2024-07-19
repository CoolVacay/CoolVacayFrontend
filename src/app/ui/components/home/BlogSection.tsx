import Link from "next/link";
import { MainCard } from "../common";
import { getBlogs } from "~/app/(application)/actions";

export async function BlogSection() {
  const blogs = (await getBlogs())!;

  return (
    <section className="flex w-full flex-col">
      <div className="flex flex-col items-center">
        <div className="flex h-[33px] w-[62px] shrink-0 items-center justify-center rounded-[64px] bg-[#29ABE2]/[.10] p-3 text-sm text-primary">
          Blog
        </div>
        <h1 className="py-4 text-center text-[56px] leading-[67px]">
          Latest blog from us
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 pb-12 pt-10 desktop:grid-cols-4">
        {blogs.length > 0 ? (
          blogs.slice(0, 4).map((blog) => {
            return (
              <Link href={`/blog/${blog.id}`} key={blog.id}>
                <MainCard
                  imageUrl={blog.image ?? "/blog_photo.jpeg"}
                  name={
                    blog.name ??
                    "How to get more bookings with Coolvacay in 2024"
                  }
                  subtitle={blog.subtitle ?? "August 1, 2024  •  2 min read "}
                  key={blog.id}
                  isBlogCard
                />
              </Link>
            );
          })
        ) : (
          <p>No blogs available at the moment</p>
        )}
      </div>
    </section>
  );
}
