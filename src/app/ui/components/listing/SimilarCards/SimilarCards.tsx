import { getSimilarListings } from "~/app/(application)/actions";
import GalleryCarousel from "../Carousel/GalleryCarousel";

export default async function SimilarCards({
  pageParams,
}: {
  pageParams: {
    source: string;
    id: string;
  };
}) {
  const similarListings = (await getSimilarListings(pageParams))!;

  return similarListings ? (
    <GalleryCarousel data={similarListings} type="card" />
  ) : (
    "Cannot find similar homes at this moment"
  );
}
