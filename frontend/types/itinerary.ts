export type ItineraryItem = {
  poiId: number;
  name: string;
  category: string;
  stayDuration: number;
  order: number;
};

export type ItineraryStats = {
  totalTime: number;
  totalDistance: number;
  poiCount: number;
  restStops: number;
  rating: number;
};
