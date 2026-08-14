export type RouteResponse = {
  type: "Feature";
  properties: {
    distance_meters: number;
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
};
