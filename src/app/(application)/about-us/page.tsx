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
      <div className="relative flex h-[614px]">
        <div className="absolute flex h-[714px] w-full">
          <Image
            alt="Coolvacay about us hero image"
            src="/about_us.png"
            quality={100}
            fill
            priority={true}
            sizes="100vw"
            style={{
              position: "absolute",
              top: -100,
              objectFit: "cover",
              filter: "brightness(40%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="absolute top-0 text-white">
            <div className="flex max-w-[1220px] items-center justify-center py-56">
              <div className="w-full">
                <h1 className="mb-8 text-[80px] font-medium leading-[80px] tracking-tight">
                  About Coolvacay
                </h1>
                <h6 className="text-center text-xl leading-[30px]">
                  At CoolVacay, we specialize in turning your dreams into
                  reality.
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-20">
              <div className="grid grid-cols-2 items-center gap-16">
                <div className="flex h-[549px] w-[592px] shrink-0">
                  <Image
                    alt="Coolvacay about us, second image"
                    src="/about-us-2.jpeg"
                    className="rounded-2xl"
                    quality={90}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={true}
                    style={{
                      objectFit: "cover",
                      height: "549px",
                      width: "592px",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <CustomChip label="Know more" width={100} />
                  <h2 className="text-[58px] font-medium leading-[67px]">
                    Rent with peace of mind with Coolvacay
                  </h2>
                  <p className="text-lg leading-7 text-[#676D73]">
                    Specializing in the marketing and management of vacation
                    rental properties, we partner directly with owners to unlock
                    the full potential of unused vacation rental and resort
                    properties. Our expertise lies in optimizing earnings for
                    owners, ensuring that every property sees maximum occupancy
                    and delivers consistent returns.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-8">
                    {partners.map((partner) => {
                      return (
                        <IconGenerator
                          key={partner}
                          src={`/${partner}_logo.svg`}
                          alt={`${partner} logo`}
                          width="auto"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-[128px]">
        <div className="flex justify-center bg-[#FAFAFA] py-16">
          <div className="flex max-w-[1220px] items-center justify-center gap-24">
            <div className="flex flex-col gap-8">
              <h1 className="text-[40px] font-bold leading-10	">Our mission</h1>
              <p className="font-medium text-[#676D73]">
                At CoolVacay, our mission is to transform your dreams into
                unforgettable experiences. We specialize in curating exceptional
                vacation options that cater to your unique desires and
                preferences. Whether you seek the tranquility of a cozy cabin
                nestled in the woods or the luxury of a coastal resort
                overlooking pristine beaches, we are dedicated to making your
                vacation dreams a reality.
              </p>
              <div className="grid grid-cols-2 gap-8">
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
            <div className="flex h-[537px] w-[542px] shrink-0">
              <Image
                alt="Coolvacay about us, third image"
                src="/contact_us_2.png"
                className="rounded-2xl"
                quality={90}
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
                style={{
                  objectFit: "cover",
                  height: "537px",
                  width: "542px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <h2 className="text-[40px] font-bold">Take people word for us</h2>
          <p className="text-[#676D73]">
            Long term planning for unlimited success
          </p>
          <div className="mt-14 flex items-center justify-start gap-6">
            <ReviewCard
              title={`"Best vacation of my life"`}
              description=""
              size="small"
              iconSrc="/avatar_1.svg"
              iconDescription={{
                name: "John Doe",
                proffesion: "CTE of Nerooni",
              }}
            />
            <ReviewCard
              title={`"It was a very good experience"`}
              description=""
              size="medium"
              iconSrc="/avatar_2.svg"
              iconDescription={{
                name: "John Doe",
                proffesion: "CTE of Nerooni",
              }}
            />
            <ReviewCard
              title={`"Smoothest experience ever"`}
              description=""
              size="small"
              iconSrc="/avatar_3.svg"
              iconDescription={{
                name: "John Doe",
                proffesion: "CTE of Nerooni",
              }}
            />
          </div>
          <div className="my-16">
            <Newsletter />
          </div>
        </div>
      </div>
    </main>
  );
}
