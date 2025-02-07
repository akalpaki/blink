import { XMLParser } from "fast-xml-parser";
/** @module blink/client 
 *  Provides a wrapper around the standard lib node clients for http and https.
 *  @author akalpaki
 * */

/**
 * @typedef header
 * @property {(number|string|Array<string>)} header
 * */

/**
 * @typedef requestOptions
 * @type {Object}
 * @property {string} method 
 * @property {URL} url 
 * @property {Object.<string,header>} headers 
 * @property {(Object|null)} body
 * */

/**
 * @typedef response
 * @type {Object}
 * */

/**
 * Make an HTTP request
 * @param {requestOptions} opts
 * */
export async function doFetch(opts) {
    const req = new Request(opts.url, {
        method: opts.method,
        body: opts.body,
        headers: opts.headers,
    })

    try {
        const res = await fetch(req)

        let body;
        let mediaType;
        switch (res.headers.get("content-type")) {
            case "application/json":
                body = await res.json();
                mediaType = "json"
                break;
            case "application/xml":
                const plaintext = await res.text();
                const parser = new XMLParser();
                body = parser.parse(plaintext);
                mediaType = "xml"
                break;
            case "text/html":
            // TODO: parse html

            default:
                throw new Error(`unimplemented content type processing: ${res.headers.get("content-type")}`)

        }

        // NOTE: think about how to return body.
        // You probably cannot return the body as is, since it's a stream.
        // Maybe we can copy it to a buffer and leave the caller to perform upstream processing?
        // We can use a buffer to pipe the response to 
        return {
            status: res.status,
            headers: res.headers,
            body: body,
            mediaType: mediaType
        };
    } catch (err) {
        throw new Error(err)
    }
}
