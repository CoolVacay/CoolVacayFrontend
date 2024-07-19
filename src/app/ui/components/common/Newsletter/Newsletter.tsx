"use client";

import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <div className="relative flex w-full shrink-0 rounded-xl">
      <div className="flex h-[250px] w-full shrink-0">
        <Image
          alt="Coolvacay about us, second image"
          src="/newsletter_img.jpeg"
          className="rounded-xl"
          quality={20}
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          style={{
            objectFit: "cover",
            height: "250px",
            width: "100%",
            filter: "brightness(60%)",
          }}
        />
      </div>
      <NewsletterForm orientation="horizontal" />
    </div>
  );
}
