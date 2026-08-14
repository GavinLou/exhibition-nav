export type MarkerCategory =
  | "itinerary"
  | "exhibition"
  | "collection"
  | "event"
  | "restaurant";

export type MapMarkerData = {
  id: string;
  name: string;
  category: MarkerCategory;
  x: number;
  y: number;
  image: string;
  description: string;
  hours?: string;
  location?: string;
};

export type CategoryInfo = {
  id: MarkerCategory;
  name: string;
  icon: string;
  color: string;
};
