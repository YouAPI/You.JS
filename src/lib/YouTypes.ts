export type SafeSearch = 'Off' | 'Moderate' | 'Strict';

type ResponseFilters =
  | 'WebPages'
  | 'Translations'
  | 'TimeZone'
  | 'Computation'
  | 'RelatedSearches'; // Add more as needed
export type ResponseFilter = ResponseFilters | ResponseFilters[];
