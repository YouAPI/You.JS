import { Fetcher, FetcherOptions, FetcherResponse, rawHeadersToMap } from "../Fetcher";
import { exec } from "child_process";

const curlBinary = process.env.CURL_BINARY || "curl";

function stripHeaders(response: string): [
    string, // headers
    string // body
] {
    const index = response.indexOf("\r\n\r\n");

    if (index === -1) {
        throw new Error("Invalid response");
    }

    return [
        response.substring(0, index),
        response.substring(index + 4)
    ];
}

function getStatusCodeAndStatusText(headers: string): [
    number, // statusCode
    string // statusText
] {
    const firstLine = headers.substring(0, headers.indexOf("\r\n"));

    const [_version, statusCode, statusText] = firstLine.split(" ");

    return [parseInt(statusCode), statusText];
}

function parseResponse(response: string): FetcherResponse {
    let [headers, body] = stripHeaders(response);

    let [statusCode, statusText] = getStatusCodeAndStatusText(headers);

    while (statusCode === 302 || statusCode === 301) {
        [headers, body] = stripHeaders(body);
        [statusCode, statusText] = getStatusCodeAndStatusText(headers);
    }

    const rawHeaders: string[] = [];

    for (const line of headers.split("\r\n")) {
        if (line === "") {
            continue;
        }

        const [key, value] = line.split(": ");

        if (value === undefined) {
            continue;
        }

        rawHeaders.push(key);
        rawHeaders.push(value);
    }

    return {
        status: statusCode,
        statusText,
        headers: rawHeadersToMap(rawHeaders),
        rawHeaders,
        body
    };
}

function optionsToString(options: FetcherOptions): string {
    let str = "";

    if (options.method) {
        str += ` -X ${options.method}`;
    }

    if (options.headers) {
        for (const key in options.headers) {
            str += ` -H "${key}: ${options.headers[key]}"`;
        }
    }

    if (options.rawHeaders) {
        let s: string | null = null;
        for (const header of options.rawHeaders) {
            if (s === null) {
                s = header;
            } else {
                str += ` -H "${s}: ${header}"`;
                s = null;
            } // Probably a better way to do this
        }
    }

    if (options.body) {
        str += ` -d "${options.body}"`;
    }

    if (options.timeout) {
        str += ` --max-time ${options.timeout}`;
    }

    return str;
}

function requestCurl(url: string, options: FetcherOptions): Promise<string> {
    const curl = exec(`${curlBinary} -iL ${optionsToString(options)} ${url}`);

    return new Promise((resolve, reject) => {
        let response = "";

        if (curl.stdout === null || curl.stderr === null) {
            reject("stdout or stderr is null");
            return;
        }

        curl.stdout.on("data", data => {
            response += data;
        });

        // curl.stderr.on("data", data => {
        //     reject(data);
        // });

        curl.on("close", code => {
            if (code === 0) {
                resolve(response);
            } else {
                reject(code);
            }
        });
    });
}

export const curlFetch: Fetcher =
    (url: string, options: FetcherOptions = {}): Promise<FetcherResponse> =>
        new Promise((resolve, reject) => {
            requestCurl(url, options)
                .then(response => resolve(parseResponse(response)))
                .catch(reject);
        });