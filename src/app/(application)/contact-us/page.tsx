import InquireForm from "~/app/ui/components/listing/InquireForm";
import Image from "next/image";
import ContactDetailsCard from "./ContactDetailsCard";
import { type Metadata } from "next";
import { TelephoneIcon } from "public/TelephoneIcon";
import { getSiteConfigurations } from "../actions";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us Page",
};

const siteConfigurations = (await getSiteConfigurations())!;
export default function Page() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center px-4 sm:px-0">
        <div className="custom-max-widths flex min-h-[640px] flex-col items-center justify-center">
          <div className="flex w-full flex-col lg:flex-row">
            <div className="h-full w-full bg-[#F7F7F7] px-6 py-10 sm:px-14 sm:py-14">
              <h2 className="text-2xl text-primary sm:text-3xl">
                How can we help?
              </h2>
              <h6 className="my-4 text-base text-[#676D73] sm:text-lg">
                {`Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.`}
              </h6>
              <InquireForm />
            </div>
            <div className="relative mt-6 hidden h-full w-full shrink-0 md:flex lg:mt-0 lg:w-[592px]">
              <Image
                alt="Coolvacay about us, second image"
                src="/contact-us.png"
                width={592}
                height={792}
                className="h-auto w-auto"
                priority={true}
                style={{
                  objectFit: "cover",
                  filter: "brightness(80%)",
                }}
              />
              {/* <div className="absolute bottom-8 left-4 flex w-11/12 flex-col gap-2 text-lg text-white sm:left-6">
                <p className="text-[20px] sm:text-[28px]">
                  {`The team's exceptional service and proactive advice have been instrumental in optimizing our financial processes.`}
                </p>
                <p>Chiara Doe</p>
                <p>Founder & CEO</p>
              </div> */}
            </div>
          </div>
          <div className="mt-10 w-full">
            <div className="flex items-center gap-5 rounded-[8px] bg-[#F7F7F7] p-6 sm:gap-10 sm:p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <TelephoneIcon color={"text-primary"} />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] font-medium text-primary sm:text-[20px]">
                  Call for assistance
                </p>
                <p className="text-sm sm:text-base">
                  Our support team is available to answer your questions, and
                  provide technical help.
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-5 rounded-[8px] bg-[#F7F7F7] p-6 sm:gap-10 sm:p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/message_icon.svg"
                  alt="Message for assistance icon"
                  width="36px"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] font-medium text-primary sm:text-[20px]">
                  Chat
                </p>
                <p className="text-sm sm:text-base">
                  Our support team is available to answer your questions, and
                  provide technical help.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="relative mt-10 flex w-full sm:mt-16">
        <Image
          alt="Coolvacay about us, second image"
          src={
            siteConfigurations?.contact?.contact_us_image
              ? siteConfigurations.contact.contact_us_image
              : "/location.png"
          }
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          style={{
            objectFit: "cover",
            height: "640px",
            width: "100%",
          }}
        />
        <ContactDetailsCard />
      </div>
    </div>
  );
}
