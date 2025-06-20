// data/index.ts
export const SPORT_TYPES = [
  'Football',
  'Basketball',
  'Tennis',
  'Golf',
  'Swimming',
  'Running',
  'Cycling',
  'Soccer',
  'Baseball',
  'Volleyball',
  'Gymnastics',
  'Boxing'
] as const;

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'AU', name: 'Australia' },
] as const;

export type SportType = typeof SPORT_TYPES[number];
export type CountryCode = typeof COUNTRIES[number]['code'];