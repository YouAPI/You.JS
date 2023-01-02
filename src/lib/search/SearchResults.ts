// Thank you https://jsonformatter.org/json-to-typescript

export interface SearchResults {
  searchQuery: string;
  searchResults: SearchResults;
  page: number;
  count: number;
  exactAbTestSlices: ExactAbTestSlices;
}

export interface ExactAbTestSlices {}

export interface SearchResults {
  mainline: SearchResultsMainline;
  sidebar: any[];
  rankings: Rankings;
}

export interface SearchResultsMainline {
  bing_related_results: any[];
  bing_places_results: any[];
  bing_search_results: BingSearchResult[];
  bing_image_results: any[];
  bing_video_results: any[];
  bing_news_results: any[];
  bing_computation_results: ExactAbTestSlices;
  bing_translations_results: ExactAbTestSlices;
  bing_timezone_results: ExactAbTestSlices;
  bing_entity_results: any[];
  rankings: Rankings;
  estimated_matches: number;
  query_context: QueryContext;
  bing_market: string;
  third_party_web_results_source: string;
  bing_top_ranked_apps: string[];
  bing_ranked_apps: string[];
  bing_meta_ranking_info: BingMetaRankingInfo;
  fact_checker_results: ExactAbTestSlices;
  heuristic_version: string;
}

export interface BingMetaRankingInfo {
  abRemoveBadUrls_v2: string;
  isNavigational: boolean;
  isInformational: boolean;
  factCheckerData: ExactAbTestSlices;
}

export interface BingSearchResult {
  name: string;
  url: string;
  displayUrl: string;
  snippet: string;
  dateLastCrawled: Date;
  datePublished: null;
  language: string;
  thumbnailUrl: null | string;
  isFamilyFriendly: boolean;
  isNavigational: boolean;
  deepLinks: null;
}

export interface QueryContext {
  originalQuery: string;
}

export interface Rankings {
  pole: null;
  mainline: MainlineElement[];
  sidebar: null;
}

export interface MainlineElement {
  answerType: AnswerType;
  resultIndex: number;
  value: Value;
}

export enum AnswerType {
  WebPages = 'WebPages',
}

export interface Value {
  id: string;
}
