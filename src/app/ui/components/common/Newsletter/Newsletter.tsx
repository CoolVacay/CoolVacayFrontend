"use client";

import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <div className="relative flex w-full shrink-0 flex-col sm:flex-row rounded-xl">
      <div className="flex h-[250px] w-full shrink-0">
        <Image
          alt="Coolvacay newsletter image"
          src="/newsletter_img.jpeg"
          className="rounded-xl sm:rounded-l-xl sm:rounded-r-none"
          quality={20}
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            filter: "brightness(60%)",
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-0">
        <NewsletterForm isTextBlack={false} />
      </div>
    </div>
  );
}
