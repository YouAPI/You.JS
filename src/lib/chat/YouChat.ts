/***************************\
*                           *
*  Not currently supported. *
*  Protected by CloudFlare  *
*                           *
\***************************/

// // https://you.com/api/youchatStreaming?question=what do you do?&chat=[{"question":"who are you?","answer":" I am YouBot, a large language model from You.com. I am designed to help with a wide range of tasks, from answering"}]

// import * as https from 'https';

// const youchatUrl = 'https://you.com/api/youchatStreaming';

// export type ChatCache = {
//     question: string;
//     answer: string;
// };

// // Since the response is of type text/event-stream, we need to parse it ourselves.
// type StreamResponse<E extends string, T> = {
//     event: E;
//     data: T;
// };

// type idfk = undefined | null;

// // idk what the data is. Serp is "search engine results page".
// type Response_serp_results = StreamResponse<'serp_results', idfk>;

// // data is actually { token: string }
// type Response_token = StreamResponse<'token', string>;

// // data is actually "I'm Mr. Meeseeks. Look at me."
// type Response_done = StreamResponse<'done', idfk>;

// // Probably a "reference" or "serp" response. Haven't been able to find any examples.
// type Response_serp = StreamResponse<'serp', idfk>;

// type Response_error = StreamResponse<'error', string | idfk>;

// export type Response = Response_serp_results | Response_token | Response_done | Response_serp | Response_error;

// const headers = {
//     'accept': `text / html, application/ xhtml + xml, application/xml;q=0.9,image/avif, image / webp, image / apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
//     'accept-encoding': `gzip, deflate, br`,
//     'accept-language': `en-CA,en;q=0.9`,
//     'cache-control': `max-age=0`,
//     'cookie': `__cf_bm=pn75.Jvn3kBBflZM9BmFIQwMG0Q1jIUdMFVO9KhlqGk-1672465490-0-AV0EvFdH8dwdkF+C99nGTuEpKWl3njvHFo2UdZPkQrjsoxDpCJd2MTAkcxUs3H8HljlAVJyed8CQ8BpmTBK40+k=`,
//     'sec-ch-ua': `"Chromium";v="108", "Not?A_Brand";v="8"`,
//     'sec-ch-ua-mobile': `?0`,
//     'sec-ch-ua-platform': `"Linux"`,
//     'sec-fetch-dest': `document`,
//     'sec-fetch-mode': `navigate`,
//     'sec-fetch-site': `none`,
//     'sec-fetch-user': `?1`,
//     'upgrade-insecure-requests': `1`,
//     'user-agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Vivaldi/5.6.2867.50`
// };

// export class YouChat {
//     private readonly chat: ChatCache[] = [];

//     private cookie: string | undefined;

//     public async init(): Promise<void> {
//         return new Promise((resolve, reject) => {
//             resolve();
//             return;
//             const req = https.request(youchatUrl, { headers, method: 'GET' });

//             req.on('response', res => {

//                 console.log("Headers: ", res.rawHeaders);
//                 console.log("Status: ", res.statusCode);
//                 this.cookie = res.headers['set-cookie']?.[0];
//                 if (!this.cookie) {
//                     reject('No cookie');
//                     return;
//                 }
//                 resolve();
//             });
//             req.on('error', reject);
//             req.end();
//         });
//     }

//     public async ask(question: string): Promise<Buffer> {
//         const answer = await this.request(question);
//         // this.chat.push({ question, answer });
//         return answer;
//     }

//     private request(question: string): Promise<Buffer> {
//         return new Promise((resolve, reject) => {
//             const req = https.request(this.getUrl(question), {
//                 headers: {
//                     ...headers,
//                     // cookie: this.cookie
//                 }
//             }, res => {
//                 console.log("Headers: ", res.headers);
//                 let errHTML = '';
//                 // const responses: Response[] = [];
//                 let body: Buffer[] = [];
//                 res.on('data', chunk => {
//                     // console.log("Chunk: ", chunk);
//                     const responseAscii = chunk.toString();
//                     if (errHTML.length > 0 || responseAscii.startsWith('<!DOCTYPE html>')) {
//                         errHTML += responseAscii;
//                         return;
//                     }
//                     // responses.push(parseResponse(response));
//                     body.push(chunk);
//                 });
//                 res.on('end', () => {
//                     if (errHTML.length > 0) {
//                         reject(errHTML);
//                         return;
//                     }
//                     // const responseText = Buffer.concat(body).toString('binary');
//                     resolve(Buffer.concat(body));
//                     // if (responses.length === 0) {
//                     //     reject('No responses');
//                     //     return;
//                     // }
//                     // const lastResponse = responses[responses.length - 1];
//                     // switch (lastResponse.event) {
//                     //     case 'done':
//                     //         resolve(parseAnswer(responses));
//                     //         break;
//                     //     case 'error':
//                     //         reject(lastResponse.data);
//                     //         break;
//                     //     default:
//                     //         reject('Unknown response: ' + lastResponse.event);
//                     // }
//                 });
//             });
//             req.on('error', reject);
//             req.write(JSON.stringify({ question, chat: this.chat }));
//             req.end();
//         });
//     }

//     private getUrl(question: string): string {
//         return youchatUrl + '?question=' + encodeURIComponent(question) + '&chat=' + encodeURIComponent(JSON.stringify(this.chat));
//     }
// }

// function parseResponse(response: string): Response {
//     // Format:
//     /*
//     event: <event name>
//     data: <data>
//     */
//     console.log("Response: ", response);

//     const lines = response.split('\n');
//     const event = lines[0].split(': ')[1];
//     const data = lines[1].split(': ')[1];
//     switch (event) {
//         case 'serp_results': // data: {"serp_results": []} idk what's in the array
//             return { event, data: undefined };
//         case 'token': // data: {"token": " word"}
//             const token = data.split('"')[3];
//             return { event, data: token };
//         case 'done': // data: I'm Mr. Meeseeks. Look at me.
//             return { event, data: undefined };
//         case 'serp': // guessing that this exists, but haven't been able to find any examples
//             return { event, data: undefined };
//         case 'error': // seems to just be data: undefined
//             return { event, data: data === "undefined" ? undefined : data };
//         default:
//             throw new Error('Unknown event: ' + event);
//     }
// }

// function parseAnswer(responses: Response[]): string {
//     const tokenResponses = responses.filter(r => r.event === 'token') as Response_token[];
//     return tokenResponses.map(r => r.data).join('');
// }
