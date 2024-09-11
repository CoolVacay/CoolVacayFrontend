import Image from "next/image";

export default function TestimonialCard({
  guest,
  summary,
  description,
  imgSrc,
}: {
  guest: string;
  summary: string;
  description: string;
  imgSrc: string;
}) {
  return (
    <div className="flex w-full shrink-0 justify-center">
      <div className="flex flex flex-col items-center justify-center gap-12 lg:flex-row">
        <div className="relative flex h-[320px] w-full shrink-0 sm:h-[480px] sm:w-[420px]">
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.00) 100%)",
            }}
          />
          <Image unoptimized
            alt="Testimonials sample photo"
            src={imgSrc ? imgSrc : "/testimonials_photo.jpeg"}
            className="h-[320px] w-full rounded-lg sm:h-[480px] sm:w-auto"
            width={0}
            height={0}
            sizes="40vw"
            priority={true}
            style={{
              objectFit: "cover",
            }}
          />
          <p className="font-base absolute left-4 bottom-4 text-xl text-white sm:text-2xl">
            {guest}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center text-4xl font-semibold sm:text-[48px] sm:leading-[57px] lg:text-left">
            {summary}
          </p>
          <p className="font-base text-center text-[#676D73] sm:text-lg lg:text-left">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
