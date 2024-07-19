import InquireForm from "~/app/ui/components/listing/InquireForm";
import Image from "next/image";
import { IconGenerator } from "~/app/ui/components/common";
import { Divider } from "@mui/material";

export default function Page() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="flex min-h-[640px] max-w-[1220px] flex-col items-center justify-center">
          <div className="flex">
            <div className="h-full w-full bg-[#F7F7F7] px-20 py-14">
              <h2 className="text-3xl text-primary">How can we help?</h2>
              <h6 className="my-5 text-lg text-[#676D73]">
                {`Have a question or feedback? Fill out the form below, and we'll get
            back to you as soon as possible.`}
              </h6>
              <InquireForm />
            </div>
            <div className="relative flex h-full w-[592px] shrink-0">
              <Image
                alt="Coolvacay about us, second image"
                src="/contact-us.jpeg"
                quality={90}
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
                style={{
                  objectFit: "cover",
                  height: "640px",
                  width: "592px",
                  filter: "brightness(50%)",
                }}
              />
              <div className="absolute bottom-8 left-6 flex w-11/12 flex-col gap-2 text-lg text-white">
                <p className="text-[28px]">
                  {`The team's exceptional service and proactive advice have been
            instrumental in optimizing our financial processes.`}
                </p>
                <p>Chiara Doe</p>
                <p>Founder & CEO</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex gap-5">
            <div className="flex items-center gap-10 rounded-[8px] bg-[#F7F7F7] p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/telephone.svg"
                  alt="Call for assistance icon"
                  width="36px"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[20px] font-medium text-primary">
                  Call for assistance
                </p>
                <p>
                  Our support team is available to answer your questions, and
                  provide technical help.
                </p>
              </div>
            </div>
            <div className="rounded-8px flex items-center gap-10 bg-[#F7F7F7] p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/message_icon.svg"
                  alt="Message for assistance icon"
                  width="36px"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[20px] font-medium text-primary">Chat</p>
                <p>
                  Our support team is available to answer your questions, and
                  provide technical help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-16 flex w-full">
        <Image
          alt="Coolvacay about us, second image"
          src="/location.png"
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
        <div className="absolute left-16 top-24 flex max-w-[480px] flex-col gap-6 bg-white px-16 py-14 font-medium">
          <div className="flex flex-col gap-3">
            <p className="mb-1 text-xl">Contact details</p>
            <p className="text-primary">
              Adress:{" "}
              <span className="text-[#676D73]">
                7380 Sand Lake Rd., Suite 130, Orlando, FL 32819
              </span>
            </p>
            <p className="text-primary">
              Phone: <span className=" text-[#676D73]">+1 302-581-9342</span>
            </p>
            <p className="text-primary">
              Email:{" "}
              <span className=" text-[#676D73]">vacay@coolvacay.com</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mb-1 text-xl">Opening hours</p>
            <p className="flex text-primary">
              Monday - Friday:{" "}
              <span className="ml-auto text-[#676D73]">
                09.00 AM - 6.00 PM{" "}
              </span>
            </p>
            <Divider />
            <p className="flex text-primary">
              Saturday:{" "}
              <span className="ml-auto text-[#676D73]">09.00 AM - 2.00 PM</span>
            </p>
            <Divider />

            <p className="flex text-primary">
              Sunday: <span className="ml-auto text-[#676D73]">Closed</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
