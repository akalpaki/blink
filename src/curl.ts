//import { XMLParser } from "fast-xml-parser";

import { RequestOptions, Response } from "./types/request";

// TODO:
// - create tests for XML use case before declaring support for it
// - implement support for endpoints returning HTML
export async function doFetch(opts: RequestOptions): Promise<Response> {
    const req = new Request(opts.url, {
        method: opts.method,
        body: opts.body as BodyInit | null | undefined,
        headers: opts.headers,
    });

    try {
        let body;
        let mediaType;

        const res = await fetch(req);

        let contentTypeHeader = res.headers.get("content-type");
        if (contentTypeHeader !== null && contentTypeHeader !== undefined) {
            contentTypeHeader = res.headers
                .get("content-type")!
                .split(" ")[0]
                .slice(0, -1);
        }

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
                    `${contentTypeHeader} handling not implemented`,
                );
        }

        return {
            status: res.status,
            headers: res.headers,
            body: body,
            mediaType: mediaType,
        };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        throw new Error(message);
    }
}
