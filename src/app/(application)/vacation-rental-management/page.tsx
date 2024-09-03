import Image from "next/image";
import {
  IconGenerator,
  Newsletter,
  CustomChip,
} from "~/app/ui/components/common";
import TestimonialsCarousel from "./TestimonialsCarousel";

const coolVacayFeatures = [
  {
    title: "Onboarding made easy",
    options: [
      "Homeowner-driven onboarding system",
      "3D virtual home tours",
      "Custom copywriting",
      "High-definition photography",
      "Best-in-class optimized listing",
    ],
  },
  {
    title: "Attracting guests",
    options: [
      "Listings on all top booking sites",
      "Targeted digital marketing",
      "Streamlined mobile app",
      "Dedicated reservation agents",
      "24/7 guest service",
    ],
  },
  {
    title: "Managing the details",
    options: [
      "Dynamic pricing technology",
      "Consistent, professional cleaning",
      "Stocking guest amenities",
      "Payment processing",
      "Guest screening and damage coverage",
    ],
  },
];
const partners = ["airbnb", "booking", "vrbo", "expedia"];

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="relative">
        <div className="bg-[#F7F7F7] px-4 py-10 sm:px-0 sm:py-0">
          <div className="flex  flex-col items-center gap-12 sm:justify-between lg:flex-row">
            <div className="flex flex-col gap-8 px-4 sm:px-0 lg:ml-20">
              <h1 className="text-center text-3xl font-semibold md:max-w-[530px] md:text-left md:text-[56px] md:leading-[67px]">
                Discover a sustainable future for your vacation rental
                management
              </h1>
              <div>
                <p className="text-lg font-medium text-[#676D73]">
                  Third Party API Integrations:
                </p>
                <div className="mt-4 grid grid-cols-4 items-center justify-items-center gap-4 sm:gap-8 lg:justify-items-start">
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
            <div className="flex h-[320px] w-full shrink-0 justify-center sm:h-[610px] lg:w-[530px] xl:w-[730px]">
              <Image
                alt="Coolvacay about us, third image"
                src="/vacation-rental-management.jpeg"
                className="md:rounded-tl-[40px]"
                width={730}
                height={610}
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
        <div className="flex max-w-[calc(100vw_-_32px)] flex-col items-center justify-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <CustomChip label="Our approach" width={120} />
          <h2 className="mt-10 text-center text-3xl font-semibold sm:text-[48px] lg:max-w-[900px] lg:leading-[47px]">
            Your trusted vacation rental management partner
          </h2>
          <h3 className="mt-10 text-center text-lg font-medium text-[#676D73] lg:max-w-[800px] lg:leading-[30px]">
            Choose us for accuracy, reliability, personalized service, proactive
            guidance, innovative solutions, and client-centric focus.
          </h3>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((index) => {
              return (
                <div key={index} className="flex flex-col gap-5">
                  <div className="h-min w-max rounded-full bg-primary/[0.10] p-2 sm:p-3">
                    <IconGenerator
                      src="/heart.svg"
                      alt="About us folder icon"
                      className="h-6 w-6"
                    />
                  </div>
                  <p className="text-xl font-semibold">
                    The most inspiring feature
                  </p>
                  <p className="line-clamp-2 text-[#737373]">
                    Tortor interdum condimentum nunc molestie quam lectus
                    euismod pulvinar risus. Cursus in odio.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mt-20">
        <div className="flex justify-center bg-[#F7F7F7] px-4 py-12 sm:px-0">
          <div className="flex max-w-[calc(100vw_-_32px)] flex-col items-center justify-center gap-12 sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
            <CustomChip label="Testimonials" width={120} />
            <div className="flex flex-col gap-8">
              <h1 className="text-center text-2xl font-semibold leading-[67px] sm:text-[54px]">
                But...don’t just take our word for it
              </h1>
              <div>
                <p className="text-center text-lg font-medium text-[#676D73]">
                  Find out what other people have to say about Coolvacay{" "}
                </p>
              </div>
            </div>
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
      <div className="mt-14 flex justify-center px-4 sm:px-0">
        <div className="flex max-w-[calc(100vw_-_32px)] flex-col items-center justify-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <CustomChip label="Experience" width={120} />
          <h2 className="mt-10 text-center text-3xl font-semibold sm:text-[48px] lg:max-w-[900px] lg:leading-[47px]">
            What you get with Coolvacay?
          </h2>
          <h3 className="mt-10 text-center text-lg font-medium text-[#676D73] sm:w-[550px] lg:max-w-[800px] lg:leading-[30px]">
            Your time is valuable. Here’s how we make your experience smooth
            from end to end.
          </h3>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coolVacayFeatures.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-5">
                  <p className="text-[28px] font-medium">{item.title}</p>
                  {item.options.map((option, index) => {
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="h-min w-max rounded-full bg-primary/[0.10] sm:p-2">
                          <IconGenerator
                            src="/checkmark.svg"
                            alt="Checkmark icon"
                            className="h-3 w-3"
                          />
                        </div>
                        <p>{option}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="my-16 w-full">
            <Newsletter />
          </div>
        </div>
      </div>
    </main>
  );
}
