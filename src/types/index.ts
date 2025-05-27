export interface QuoteResponse {
  city: string;
  mood: string;
  weather: string;
  quotes: string[];
}

export type MoodType = "happy" | "tired" | "confused" | "sad" | "hungry";

export const CITIES = [
  "Seoul",
  "Busan",
  "Incheon",
  "Daegu",
  "Daejeon",
  "Gwangju",
  "Ulsan",
  "Sejong",
  "Jeju",
] as const;

export type CityType = (typeof CITIES)[number];

export interface HistoryItem {
  id: string;
  city: string;
  mood: string;
  weather: string;
  quotes: string[];
  timestamp: number;
}

export type HistoryType = HistoryItem[];
