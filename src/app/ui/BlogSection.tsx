import MainCard from "./components/MainCard/MainCard";

const BlogSection = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex h-[33px] w-[62px] shrink-0 items-center justify-center rounded-[64px] bg-[#29ABE2]/[.10] p-3 text-sm text-primary">
                Blog
            </div>
            <h1 className="py-4 text-center text-[56px] leading-[67px]">
                Latest blog from us
            </h1>
            <div className="desktop:grid-cols-4 grid grid-cols-2 gap-5 py-10">
                {Array.from({ length: 4 }, (_, i) => i + 1).map((card) => {
                    return (
                        <MainCard
                            src="/blog_photo.jpeg"
                            title="How to get more bookings with Coolvacay in 2024"
                            subtitle="August 1, 2024  •  2 min read "
                            key={card}
                            isBlogCard
                            imgHeight={280}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BlogSection;
