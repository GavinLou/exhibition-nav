export type ExploreCategory =
  | "restaurant"
  | "event"
  | "exhibition"
  | "collection"
  | "hotspot";

export type ExploreItem = {
  id: string;
  category: ExploreCategory;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  location?: string;
  hours?: string;
  poiId?: number;
};

export type ExploreCategoryInfo = {
  id: ExploreCategory;
  name: string;
  icon: string;
};
