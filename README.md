
<h1 align="center">
  <br>
  <a href="https://github.com/YouAPI/You.JS"><img src="https://raw.githubusercontent.com/YouAPI/You.JS/main/assets/You.JS.png?token=GHSAT0AAAAAABXN334JQHTCAWO5UECZMJAEY5TNAOQ" alt="You.JS Logo" width="200"></a>
  <br>
  <br>
  You.JS
  <br>
</h1>

<h4 align="center">An unofficial JavaScript library for <a href="http://you.com/" target="_blank">you.com</a>.</h4>

<!-- TODO: Re-add the commented-out stuff but javascriptified -->

<!-- <div align="center">
  [![Python Version](https://img.shields.io/pypi/pyversions/youdotcom.svg)](https://pypi.org/project/youdotcom/)
  [![Dependencies Status](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)](https://github.com/silkepilon/youdotcom/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aapp%2Fdependabot)
  [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
  [![Security: bandit](https://img.shields.io/badge/security-bandit-green.svg)](https://github.com/PyCQA/bandit)
  [![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/silkepilon/youdotcom/blob/master/.pre-commit-config.yaml)
  [![Semantic Versions](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--versions-e10079.svg)](https://github.com/silkepilon/youdotcom/releases)
  [![License](https://img.shields.io/github/license/silkepilon/youdotcom)](https://github.com/silkepilon/youdotcom/blob/master/LICENSE)
  ![Coverage Report](assets/images/coverage.svg)
</div> -->

<p align="center">
  <a href="#about">About</a> •
  <!-- <a href="#key-features">Key Features</a> • -->
  <a href="#install">Install</a> •
  <a href="#how-to-use">How To Use</a> •
  <!-- <a href="#credits">Credits</a> • -->
  <a href="#license">License</a>
</p>

**NOTE: This is a work in progress. README is not complete.**

## About
Welcome to the the You.JS Library!

This library allows developers to easily access and utilize all of the functionality of the You.com platform through a simple and intuitive JavaScript API. With the library, developers can access a variety of You.com apps and services, including but not limited to:

* The search engine

To get started with You.JS, read <a href="#install">install</a> and then <a href="#how-to-use">how to use</a>.

We hope you enjoy using You.JS!
> adapted from [YouDotCom](https://github.com/YouAPI/YouDotCom)'s README.md


## Install

To install the You.JS library, simply run the following command in your terminal:

```bash
npm install youdotjs
```

> Note: You.JS is named `youdotjs` on npm because `youjs` is already taken and `you.js` is too similar.

You must also download [curl-impersonate](https://github.com/lwthiker/curl-impersonate/releases/latest), put it somewhere, and add an environment variable called `CURL_BINARY` that points to one of the impersonated curl binaries (such as `curl_chrome99` or `curl_ff100`).

> Note: curl-impersonate does not currently work on Windows. If you are on Windows, you can either use WSL or use the [curl-impersonate-win](https://github.com/depler/curl-impersonate-win/releases/latest).

Alternatively, you may also implement the `Fetcher` function yourself to bypass CloudFlare's anti-bot measures. I have taken a shortcut and simply used curl-impersonate, but you may use any method you wish. I will explain more in the <a href="#how-to-use">how to use</a> section.

## How To Use

### Fetcher

The `Fetcher` function is used to create a custom fetcher for the library to use. It is a function that takes a URL and returns a promise that resolves to a string containing the HTML of the page at the given URL. The `curlFetch` function is an example of a fetcher that uses curl-impersonate to bypass CloudFlare's anti-bot measures.

It is recommended that you use a fetcher that bypasses CloudFlare's anti-bot measures, as the library will not work without one. However, if you do not want to use a fetcher, you may use the `httpsFetch` function, which uses the `https` module to fetch the page. However, this will not bypass CloudFlare's anti-bot measures, so the library will not work.

#### Using a Fetcher

The `Fetcher` function takes one or two arguments. The first argument is the URL to fetch. The second argument is an optional object containing options for the fetcher. It returns a promise that resolves to a `FetcherResponse` object.

> TODO: Add documentation for all objects

The `Fetcher` is defined as follows:

```ts
type Fetcher = (url: string, options?: FetcherOptions) => Promise<FetcherResponse>;
```

The `FetcherOptions` object is defined as follows:

```ts
interface FetcherOptions {
  headers?: { [key: string]: string };
  rawHeaders?: string[]; // [key, value, key, value, ...]
  method?: string;
  body?: string;
  timeout?: number;
}
```

The `FetcherResponse` object is defined as follows:

```ts
interface FetcherResponse  {
  status: number | undefined;
  statusText: string | undefined;
  headers: { [key: string]: string };
  rawHeaders: string[];
  body: string;
}
```

To use, for example, `httpsFetch`, you would do the following:

```ts
import { httpsFetch } from 'youdotjs';

httpsFetch('https://example.com').then((response) => {
  console.log(response.body);
}).catch((error) => {
  console.error(error);
});
```

#### curlFetch

To use the `curlFetch` function, you must first download [curl-impersonate](https://github.com/lwthiker/curl-impersonate/releases/latest), put it somewhere, and add an environment variable called `CURL_BINARY` that points to one of the impersonated curl binaries (such as `curl_chrome99` or `curl_ff100`).

> Note: curl-impersonate does not currently work on Windows. If you are on Windows, you can either use WSL or use the [curl-impersonate-win](https://github.com/depler/curl-impersonate-win/releases/latest).

### Search

> TODO: Add documentation for search

For now, you can see the [Search.ts](src/lib/search/Search.ts) file for documentation. (I'm originally a Java developer, so this is why all the files are CamelCase.)

### YouChat

Currently not implemented because CloudFlare's restrictions on the YouChat API are too strict.

## Discord
We also have an active [Discord server](https://discord.gg/SD7wZMFSvV) where you can chat with developers and get help with using the library. Our Discord community is a great place to ask questions, share your projects, and get feedback from other developers.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details
