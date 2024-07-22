export interface Context {
  street?: { name: string };
  neighborhood?: { name: string };
  place?: { name: string };
  district?: { name: string };
  region: { name: string };
  country: { name: string };
  postcode?: { name: string };
}

export interface SearchResponse {
  features: {
    geometry: {
      coordinates: [number, number];
    };
    properties: {
      name: string;
      context: Context;
    };
  }[];
}
export interface Borough {
  [day: number]: Items[];
}

export interface Items {
  name: string;
  lngLat: [number, number];
  location: string;
}

export interface Card {
  title: string;
  location: string;
}
export interface LocationInputProps {
  title: string;
  location: string;
  suggestions: any[];
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  onAddMarker: () => void;
  onClose: () => void;
}
export interface DayNavigationProps {
  currentDay: number;
  onDayChange: (direction: "left" | "right") => void;
}

export interface BoroughCardProps {
  borough: {
    name: string;
    lngLat: [number, number];
    location: string;
  };
  index: number;
  onCardClick: () => void;
}

export interface Context {
  street?: { name: string };
  neighborhood?: { name: string };
  postcode?: { name: string };
  place?: { name: string };
  district?: { name: string };
  region: { name: string };
  country: { name: string };
}
