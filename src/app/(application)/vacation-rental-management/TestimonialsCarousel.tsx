"use client";

import { TestimonialCard } from "~/app/ui/components/common";
import { DotButton, useDotButton } from "./TestimonialsCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex w-full">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
            <TestimonialCard key={index} />
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
