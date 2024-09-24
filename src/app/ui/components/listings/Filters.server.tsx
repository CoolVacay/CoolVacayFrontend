import { FiltersComponent } from "./Filters.client";
import { getCategories, getLocationsList } from "~/app/(application)/actions";

export default async function Filters() {
  const locationsList = (await getLocationsList())!;
  const categories = (await getCategories())!;

  return (
    <FiltersComponent locationsList={locationsList} categories={categories} />
  );
}
