export interface ListingData {
  id?: string;
  source?: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  bathrooms?: number;
  bedrooms?: number;
  propertyType?: string;
  startRating?: number | null;
  squareFeets?: number | undefined;
  price?: number;
  imageUrl: string;
}

export interface popularCategoriesData {
  id: number;
  name: string;
  iconName: string;
  iconUrl: string;
}
