// 大螢幕行程規劃系統的類型定義

export type TargetType =
  | 'attractions'
  | 'exhibition'
  | 'event'
  | 'restaurant'
  | 'collection';

export type LanguageType = 'zh_TW' | 'en' | 'ja';

export type StatusType = 'open' | 'maintenance' | 'closed';

export interface Location {
  lat: number;
  lng: number;
}

export interface ItineraryItem {
  id: string;
  targetType: TargetType;
  targetId: string;
  title: string;
  description: string;
  imageUrl?: string;
  suggestedStayMinutes: number;
  sequenceOrder: number;
  location?: Location;
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  isGuide?: boolean;
}

export interface RecommendedItinerary {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  estimatedDurationMinutes: number;
  totalDistance?: number; // km
  averageRating?: number;
  items: ItineraryItem[];
}

export interface UserItinerary {
  id: string;
  visitDate: string;
  title: string;
  totalParticipants: number;
  isAccessibleRequired: boolean;
  items: ItineraryItem[];
}

export interface SearchResult {
  id: string;
  type: TargetType;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  duration: number;
  status: StatusType;
  location?: Location;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  price?: number;
}

export interface RouteInfo {
  totalTime: string; // e.g., "3小時"
  distance: string; // e.g., "2.5公里"
  rating: number; // 1-5
}

export interface FilterOptions {
  openingHours?: string[];
  types?: TargetType[];
  participants?: number;
}

export type StepNumber = 1 | 2 | 3 | 4;
