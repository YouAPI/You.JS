// Load .env file

import { curlFetch } from '../curl/CurlFetcher';
import { search } from '../search/Search';

import fs from 'fs';
import { SearchResults } from '../search/SearchResults';
require('dotenv').config();

search(curlFetch, {
  q: 'what is a cat',
  page: 1,
  count: 10,
  safeSearch: 'Off',
  onShoppingPage: false,
  responseFilter: [],
  domain: 'image',
})
  .then(str => {
    fs.writeFileSync('str', str);
  })
  .catch(console.error);

// import { YouChat } from '../dist/YouChat.js';
// import * as zlib from 'zlib';

// const youchat = new YouChat();
// await youchat.init();
// let response = await youchat.ask('Hello! What is your name?');

// console.log(response);

// zlib.gunzip(response, (err, buffer) => {
//     if (!err) {
//         const str = buffer.toString();
//         console.log(str);

//         fs.writeFileSync('str', str);
//     } else {
//         console.log(err);
//     }
// });
