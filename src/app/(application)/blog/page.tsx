import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../ui/components/common/CustomButton";
import { CustomChip, MainCard } from "~/app/ui/components/common";
import { getBlogs } from "../actions";
import dayjs from "dayjs";

async function Page() {
  const blogs = await getBlogs();

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="flex gap-20">
            <div className="flex flex-col gap-5">
              <CustomChip label="Featured" width={80} />
              <div className="flex flex-col gap-3">
                <h2 className="text-[50px] font-medium leading-[67px]">
                  A complete travel guide to Siesta & Longboat Key
                </h2>
                <p className="mb-2 leading-[30px] text-gray-600">
                  Repeatedly named the best beach in the country, it is baffling
                  how discovered Siesta Key beach still is. The white sand
                  against the crystal clear turquoise waters of the Gulf of
                  Mexico is jaw-dropping enough but add in the lack of...
                </p>
                <CustomButton label="Read more" width={160} />
              </div>
            </div>
            <div className="flex h-[370px] w-[530px] shrink-0">
              <Image
                alt="Blog image"
                src="/blog_page_image.png"
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
          <div className="mt-10 grid grid-cols-4 gap-8 py-10">
            {blogs.map((card) => {
              return (
                <Link key={card.id} href={`/blog/${card.id}`} className="h-82">
                  <MainCard
                    imageUrl="/blog_photo.jpeg"
                    name={card.title}
                    subtitle={`${dayjs(card.createdOn).format('MMMM d, YYYY')}  •  ${card.readTime} min`}
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
