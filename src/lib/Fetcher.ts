import * as http from 'http';
import * as https from 'https';

export interface FetcherOptions {
  headers?: { [key: string]: string };
  rawHeaders?: string[]; // [key, value, key, value, ...]
  method?: string;
  body?: string;
  timeout?: number;
}

export interface FetcherResponse {
  status: number | undefined;
  statusText: string | undefined;
  headers: { [key: string]: string };
  rawHeaders: string[];
  body: string;
}

export type Fetcher = (
  url: string,
  options?: FetcherOptions
) => Promise<FetcherResponse>;

export function rawHeadersToMap(
  rawHeaders: string[]
): { [key: string]: string } {
  const headers: { [key: string]: string } = {};
  for (let i = 0; i < rawHeaders.length; i += 2) {
    headers[rawHeaders[i]] = rawHeaders[i + 1];
  }
  return headers;
}

export const httpFetch: Fetcher = (
  url: string,
  options: FetcherOptions = {}
): Promise<FetcherResponse> =>
  new Promise((resolve, reject) => {
    const req = http.request(url, options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: rawHeadersToMap(res.rawHeaders),
          rawHeaders: res.rawHeaders,
          body,
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });

export const httpsFetch: Fetcher = (
  url: string,
  options: FetcherOptions = {}
): Promise<FetcherResponse> =>
  new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: rawHeadersToMap(res.rawHeaders),
          rawHeaders: res.rawHeaders,
          body,
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
