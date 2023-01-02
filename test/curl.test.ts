// Load .env file

import { curlFetch } from '../src/index';
require('dotenv').config();

test('curlFetch', async () => {
  // You.com is protected by CloudFlare, so regular fetch() will not work.
  // We have to use curlFetch() instead which uses a modified version of curl.
  const response = await curlFetch('https://www.you.com');
  expect(response.status).toBe(200);
});
