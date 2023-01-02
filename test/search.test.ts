import { search, streamingSearch, curlFetch } from '../src/index';

test('search', async () => {
  const response = await search(curlFetch, {
    q: 'test',
    page: 1,
    count: 10,
    safeSearch: 'Off',
    onShoppingPage: false,
    responseFilter: 'WebPages',
    domain: 'search',
  });
  expect(response).toBeDefined();
});

test('streamingSearch', async () => {
  const response = await streamingSearch(curlFetch, {
    q: 'test',
    page: 1,
    count: 10,
    safeSearch: 'Off',
    onShoppingPage: false,
    responseFilter: 'WebPages',
    domain: 'search',
  });
  expect(response).toBeDefined();
});
