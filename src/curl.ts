//import { XMLParser } from "fast-xml-parser";

import { RequestOptions, Response } from "./types/request";

// TODO:
// - create tests for XML use case before declaring support for it
// - implement support for endpoints returning HTML
export async function doFetch(opts: RequestOptions): Promise<Response> {
    const req = new Request(opts.url, {
        method: opts.method,
        // https://www.scaler.com/topics/typescript/typescript-as/
        body: opts.body as BodyInit | null | undefined,
        headers: opts.headers,
    });

    try {
        const res = await fetch(req);

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_response_status
        // I would propose to add status check to existing code according documentation
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        let contentTypeHeader = res.headers.get("content-type");

        // do we need to use more specific error in case of missing contentTypeHeader?
        // if (!contentType) {
        //   throw new TypeError("Oops, incorrect contentType in responce!");
        // }
        if (contentTypeHeader !== null && contentTypeHeader !== undefined) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_headers
            // is it possible to use .includes method as per example in the doc instead of .split(" ")[0].slice(0, -1)?
            contentTypeHeader = res.headers
                .get("content-type")!
                .split(" ")[0]
                .slice(0, -1);
        }

        let body;
        let mediaType;

        switch (contentTypeHeader) {
            case "application/json":
                body = await res.json();
                mediaType = "json";
                break;
            //case "application/xml":
            //    const plaintextXML = await res.text();
            //    const xmlParser = new XMLParser();
            //    body = xmlParser.parse(plaintextXML);
            //    mediaType = "xml";
            //    break;
            case "text/plain":
                body = await res.text();
                mediaType = "text";
                break;
            default:
                throw new Error(
                    `${contentTypeHeader} handling not implemented`
                );
        }

        return {
            status: res.status,
            headers: res.headers,
            body: body,
            mediaType: mediaType,
        };
    } catch (err) {
        let message;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
        // is it possible to use conditional operator here?

        // I find the same code in requestProcessor.ts catch handler
        // What about putting this code into separate fuction under /util folter to follow DRY pronciple?
        if (err instanceof Error) {
            message = err.message;
        } else {
            message = String(err);
        }

        throw new Error(message);
    }
}
