"use client";

import { TestimonialCard } from "~/app/ui/components/common";
import { DotButton, useDotButton } from "./TestimonialsCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    guest: "Summer Abrams",
    summary: `Great experience! Amazing stay near the beach.`,
    description:
      "Exactly as described. Check in process was easy with instructions. The front desk couldn’t find my reservation at first, she had to check around and then found it. Had everything I needed for my stay. Comfortable bed, clean, steps from the beach, parking pass. The host response time is amazing.",
    imgSrc:
      "https://azureblobimg.blob.core.windows.net/coolvacay/46_Virginia_Beach.png",
  },
  {
    guest: "Anthony Laughman",
    summary:
      "Had an amazing time! Scenic cabin stay in Maine with convenient amenities.",
    description:
      "Our stay in Jackman, Maine was a great experience it's exactly what you would expect staying in a cabin. Beautiful scenic views and all the amenities were so convenient especially if staying with kids in the summer they loved both pools.",
    imgSrc: "https://azureblobimg.blob.core.windows.net/coolvacay/4.png",
  },
  {
    guest: "Heather Sincavage",
    summary: "All you need to know is: I will come back.",
    description:
      "Very nice clean condo. Location is great. Short easy walk to the beach. Plenty of restaurants, convenience stores, ice cream etc. within walking distance. Very responsive when you message. Had a great time! Would definitely rent again if we go back to OC.",
    imgSrc:
      "https://azureblobimg.blob.core.windows.net/coolvacay/3_Ocean_City.png",
  },
];

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              guest={testimonial.guest}
              summary={testimonial.summary}
              description={testimonial.description}
              imgSrc={testimonial.imgSrc}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="mt-5 flex gap-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${index === selectedIndex ? "border border-[#29ABE2]" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
