export type Theme = {
  id: string;
  name: string;
  icon: string;
  description: string;
  duration: number;
  distance: number;
  difficulty: 1 | 2 | 3;
  poiIds: number[];
  color: string;
};
