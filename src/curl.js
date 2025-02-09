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

        const contentTypeHeader = res.headers.get("content-type").split(" ")[0].slice(0, -1)
        let body;
        let mediaType;

        switch (contentTypeHeader) {
            case "application/json":
                body = await res.json();
                mediaType = "json"
                break;
            case "application/xml":
                const plaintextXML = await res.text();
                const xmlParser = new XMLParser();
                body = xmlParser.parse(plaintextXML);
                mediaType = "xml";
                break;
            case "text/plain":
                body = res.text();
                mediaType = "text";
                break;
            default:
                throw new Error(`unimplemented content type processing: ${contentTypeHeader}`)
        }

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
