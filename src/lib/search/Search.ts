import { ResponseFilter, SafeSearch } from '../YouTypes';
import { Fetcher } from '../Fetcher';

export interface SearchOptions {
  q: string; // query
  page: number;
  count: number;
  safeSearch: SafeSearch;
  onShoppingPage: boolean;
  responseFilter: ResponseFilter;
  domain: string; // 'search', 'image', 'video', etc.
  tbm?: string; // 'isch', 'vid', etc.
  // fromSearchBar: boolean; // not a good idea to use this
}

const jsonQueryURL = 'https://you.com/api/search';

const streamQueryURL = 'https://you.com/api/streamingSearch';

function optionsToUrl(
  options: SearchOptions,
  url: string = jsonQueryURL
): string {
  const responseFilter =
    typeof options.responseFilter === 'string'
      ? options.responseFilter
      : options.responseFilter.join(',');
  return (
    `${url}?q=${encodeURIComponent(options.q)}&page=${options.page}` +
    `&count=${options.count}&safeSearch=${options.safeSearch}` +
    `&onShoppingPage=${options.onShoppingPage}` +
    `&responseFilter=${responseFilter}&domain=${options.domain}`
  );
}

export function search(
  fetcher: Fetcher,
  query: SearchOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetcher(optionsToUrl(query))
      .then(response => {
        if (response.status === 200) {
          resolve(response.body);
        } else {
          reject(response.status);
        }
      })
      .catch(reject);
  });
}

export function streamingSearch(
  fetcher: Fetcher,
  query: SearchOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetcher(optionsToUrl(query, streamQueryURL))
      .then(response => {
        if (response.status === 200) {
          resolve(response.body);
        } else {
          reject(response.status);
        }
      })
      .catch(reject);
  });
}
