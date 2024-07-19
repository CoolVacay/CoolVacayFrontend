import Image from "next/image";

import { CustomChip } from "~/app/ui/components/common";
import { SearchCard } from "../../../ui/components/home/SearchCard";
import NewsletterForm from "~/app/ui/components/common/Newsletter/NewsletterForm";

export default function Blogpage() {
  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="flex gap-10">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <CustomChip label="Featured" width={80} />
                <div className="flex flex-col gap-3">
                  <h2 className="text-[50px] font-medium leading-[67px]">
                    A Complete Travel Guide to Siesta Key, Florida
                  </h2>
                  <p className="leading-[30px] text-[#6E7A84] text-gray-600">
                    {`August 1, 2024  •  2 min read`}
                  </p>
                </div>
              </div>
              <div className="flex h-[350px] w-[870px] shrink-0">
                <Image
                  alt="Blog image"
                  src="/blog_page_image.png"
                  className="rounded-2xl"
                  quality={80}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    height: "350px",
                    width: "870px",
                  }}
                />
              </div>
              <div className="text-[#676D73]">
                <h6>
                  Repeatedly named the best beach in the country, it is baffling
                  how undiscovered Siesta Key beach still is. The white sand
                  against the crystal clear turquoise waters of the Gulf of
                  Mexico is jaw-dropping enough, but add in the lack of people,
                  chill beach town, and access to Sarasota’s nightlife and you
                  have a combo that is worth traveling for. A small barrier
                  island off the coast of Florida’s West coast, Siesta Key has
                  been a long kept secret of ours.
                </h6>
                <h6>
                  As we’ve mentioned before, Joe and I love traveling with other
                  people than each other once in a while. While he normally goes
                  to football games on his boys trips, like the weekend trip to
                  Houston he did after we spent a week eating tacos in Austin,
                  my girls and I usually opt for something a bit different – I
                  know, we’re filling too many stereotypes here.
                </h6>
                <h4>How to get to Siesta Key, FL</h4>
                <h6>
                  First things first, how do you get to this little barrier
                  island? There are two airports nearby, Tampa and Sarasota.
                  Tampa is a much larger airport and traditionally has cheaper
                  flights, but Sarasota is closer. The further option, the drive
                  from Tampa to Siesta Key is a little over an hour and crosses
                  the beautiful and scenic Sky Bridge en route. There are
                  pull-offs along the highway with gorgeous views of the bays
                  and intercoastal waterways. I’ve seen dolphins on this drive,
                  no lie. The drive from Sarasota airport to Siesta Key is about
                  a half hour. While this is shorter than the drive from Tampa
                  airport to Siesta Key, the flights are often cheaper. The best
                  one just depends on where you’re flying in from and if your
                  priority is time or money!
                </h6>
                <h4>How to get to from Tampa to Siesta Key</h4>
                <h6>
                  With our eyes always on the budget (more money = more
                  traveling HELLOOOOOO), we have always flown into Tampa. From
                  here the easiest way to get to Siesta Key is by renting a car
                  at the airport. The car is also the easiest way to get around
                  the area during vacation. If renting a car is not an option,
                  there are Lyft’s by the plenty and a few shuttles that offer
                  services to Siesta Key, but they take just as long and can be
                  just as expensive as a taxi. For a similar cost, there are
                  also private car companies who can chauffeur you down to the
                  Key. These should be scheduled with advanced notice.
                </h6>
                <div className="flex h-[520px] w-[870px] shrink-0">
                  <Image
                    alt="Blog image"
                    src="/blog_page_image.png"
                    className="rounded-2xl"
                    quality={90}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                      height: "520px",
                      width: "870px",
                    }}
                  />
                </div>
                <h4>Where to Stay in Siesta Key</h4>
                <h6>
                  The Siesta Key accommodations market is limited, so this takes
                  advanced planning. There is a small selection of hotels that
                  are supposed to be beautiful, but we prefer to opt for home
                  rentals when visiting. This last time around, we rented the
                  second floor of a beach bungalow in an ideal location a block
                  off the beach. In terms of where to stay on the island, that
                  depends on what you want. I absolutely loved the location of
                  our last house. It was walking distance to Siesta Key village
                  and across the street from a beach access point for Siesta
                  Beach, my personal favorite of the three choices.
                  Additionally, the access point we used spit us out further
                  from the crowds near the public parking area. While we lost
                  the amenities of the main beach area–snack stand, bathrooms,
                  and lifeguards–we felt it was well worth it to gain more
                  solitude and never have our ocean views blocked by a neighbors
                  umbrella.
                </h6>
              </div>
            </div>
            <div className="mt-24 flex flex-col gap-5">
              <div className="flex h-min flex-col gap-5 rounded-[10px] bg-[#F7F7F7] p-6">
                <h5 className="text-2xl font-medium">
                  Find your perfect place now
                </h5>
                <SearchCard size="small" />
              </div>
              <div className="flex h-min flex-col gap-5 rounded-[10px] bg-[#F7F7F7] p-6">
                <NewsletterForm orientation="vertical" />
                <div className="flex h-[190px] w-[260px] shrink-0">
                  <Image
                    alt="Blog image"
                    src="/blog_image_png.jpeg"
                    className="rounded-sm"
                    quality={10}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                      height: "190px",
                      width: "262px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
