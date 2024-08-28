import Image from "next/image";
import {
  IconGenerator,
  InfoCard,
  Newsletter,
  ReviewCard,
  CustomChip,
} from "~/app/ui/components/common";

export default function Page() {
  const partners = [
    "airbnb",
    "booking",
    "expedia",
    "google",
    "tripadvisor",
    "vrbo",
  ];

  return (
    <main className="flex flex-col">
      <div className="relative -mt-24 flex h-[588px]">
        <div className="absolute flex h-[588px] w-full">
          <Image
            alt="Coolvacay about us hero image"
            src="/about_us.jpeg"
            fill
            priority={true}
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(40%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[calc(100vw_-_32px)] items-center justify-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-32 text-white md:top-44">
              <div className="flex justify-center">
                <div className="w-full text-center">
                  <h1 className="mb-4 text-4xl font-medium leading-[50px] tracking-tight sm:mb-8 sm:text-[80px] sm:leading-[80px]">
                    Welcome to CoolVacay!
                  </h1>
                  <h6 className="mx-10 text-lg leading-7 sm:mx-40 sm:text-xl sm:leading-[30px] lg:mx-60">
                    At CoolVacay, we believe in transforming the way timeshare
                    resorts and individual vacation properties are managed.
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-20">
              <div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
                <div className="shrink-0 lg:flex lg:h-[420px]">
                  <Image
                    alt="Coolvacay about us, second image"
                    src="/about_us_2.jpeg"
                    className="rounded-2xl"
                    quality={80}
                    width={452}
                    height={420}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center lg:justify-start">
                    <CustomChip label="Know more" width={100} />
                  </div>

                  <h2 className="md:leading-80 text-center text-[32px] leading-[47px] sm:font-semibold md:text-[46px] lg:text-left">
                    Join the CoolVacay Family
                  </h2>
                  <p className="text-center text-base leading-6 text-[#676D73] sm:leading-7 lg:text-left lg:text-lg">
                    We invite you to join the CoolVacay family and experience
                    the difference our dedicated team and innovative solutions
                    can make. Let us unlock the full potential of your property
                    together.
                  </p>
                  <div className="mt-8 grid grid-cols-3 items-center	 justify-items-center gap-4 sm:gap-8 lg:justify-items-start">
                    {partners.map((partner) => (
                      <IconGenerator
                        key={partner}
                        src={`/${partner}_logo.svg`}
                        alt={`${partner} logo`}
                        width="auto"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-16 sm:mt-[128px]">
        <div className="flex justify-center bg-[#FAFAFA] px-4 py-16 sm:px-0">
          <div className="flex  flex-col items-center justify-center gap-12 sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] lg:flex-row xl:max-w-[1220px] xl:gap-24">
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-bold leading-8 sm:text-[40px] sm:leading-10">
                Our Story
              </h1>
              <p className="font-medium text-[#676D73]">
                Founded by a group of passionate travelers and real estate
                experts, CoolVacay was born from a desire to help property
                owners maximize their income and share their amazing properties
                with the world. We understand the challenges and joys of
                property ownership, and we are here to make the experience as
                rewarding as possible.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-8 md:gap-2 lg:gap-4">
                <InfoCard
                  iconSrc="/folder-open.svg"
                  title="1.5K"
                  subtitle="Listed Properties"
                />
                <InfoCard
                  iconSrc="/user-group.svg"
                  title="2.5K"
                  subtitle="Happy Costumers"
                />
                <InfoCard
                  iconSrc="/download-icon.svg"
                  title="5 ★"
                  subtitle="Star Reviews"
                />
                <InfoCard
                  iconSrc="/globe.svg"
                  title="450"
                  subtitle="Daily Transactions"
                />
              </div>
            </div>
            <div className="flex h-[320px] w-full shrink-0 sm:h-[537px] md:w-[542px]">
              <Image
                alt="Coolvacay about us, third image"
                src="/about_us_3.jpeg"
                className="rounded-2xl"
                width={542}
                height={537}
                priority={true}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 flex justify-center px-4 sm:px-0">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-bold sm:text-[40px]">
            Here is what people say about us
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ReviewCard
              title="Best vacation of my life"
              description=""
              size="small"
              iconSrc="/avatar_1.svg"
              iconDescription={{
                name: "John Doe",
                proffesion: "CTE of Nerooni",
              }}
            />
            <ReviewCard
              title="It was a very good experience"
              description=""
              size="medium"
              iconSrc="/avatar_2.svg"
              iconDescription={{
                name: "Jerry Narrow",
                proffesion: "CTF of Vectorian",
              }}
            />
            <ReviewCard
              title="Smoothest experience ever"
              description=""
              size="small"
              iconSrc="/avatar_3.svg"
              iconDescription={{
                name: "Liam Meri",
                proffesion: "CTO of HeroSection",
              }}
            />
          </div>
          <div className="my-16 w-full">
            <Newsletter />
          </div>
        </div>
      </div>
    </main>
  );
}
