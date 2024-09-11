"use client";

import { TestimonialCard } from "~/app/ui/components/common";
import { DotButton, useDotButton } from "./TestimonialsCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    guest: "Kim D.",
    summary: `Great experience! Kudos!`,
    description:
      "I had so much fun that I did not want to return home. You will fall in love with the staff…the management team was on point. All I can say is “Kudos” to the entire team…you all ROCK!!!!",
    imgSrc:
      "https://azureblobimg.blob.core.windows.net/coolvacay/46_Virginia_Beach.png",
  },
  {
    guest: "Evelin G.",
    summary:
      "Beautiful place and friendly staff",
    description:
      "It is a very beautiful place. Really quiet and enjoyable. Friendly staff, rooms are very well equipped and clean. The pool area was very clean as well. Nice view from pool and from the rooms.",
    imgSrc: "https://azureblobimg.blob.core.windows.net/coolvacay/7.png",
  },
  {
    guest: "Christina M.",
    summary: "Great location and clean rooms",
    description:
      "Location of property is very convenient. You can walk to the beach and restaurants within minutes. Rooms are well kept. Staff are very friendly. The views of the water are amazing too!",
    imgSrc:
      "https://azureblobimg.blob.core.windows.net/coolvacay/3_Ocean_City.png",
  },
  {
    guest: "Nathan H.",
    summary: "Great staff, well equiped rooms",
    description:
      "I love Caloosa Cove!! We have stayed several times and it just gets better. Very clean, well equipped, great staff.",
    imgSrc:
      "https://azureblobimg.blob.core.windows.net/coolvacay/8.png",
  }
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
