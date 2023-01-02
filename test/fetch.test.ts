// Load .env file

import { httpFetch, httpsFetch } from '../src/index';
require('dotenv').config();

test('httpFetch', async () => {
  const response = await httpFetch('http://www.google.com');
  expect(response.status).toBe(200);
});

test('httpsFetch', async () => {
  const response = await httpsFetch('https://www.google.com');
  expect(response.status).toBe(200);
});
