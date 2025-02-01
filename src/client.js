/** @module blink/client 
 *  Provides a wrapper around the standard lib node clients for http and https.
 *  @author akalpaki
 * */

import { request as httpsRequest, RequestOptions } from "node:https"
import { request as httpRequest } from "node:http"

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
 * Client is the base of the system,
 * allowing us to create http requests.
 * */
export class Client {
    constructor() { }

    /**
     * Make an HTTP or HTTPS request
     * @param {requestOptions} opts
     * */
    do(opts) {
        /** @type {RequestOptions}*/
        const options = {
            host: opts.url.host,
            path: opts.url?.pathname,
            method: opts.method,
            headers: opts.headers,
        };

        let req;
        switch (opts.url.protocol) {
            case "https:":
                req = httpsRequest(options, (res) => {
                    let data = "";

                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    res.on("close", () => {
                        console.log(`Request completed with status ${res.statusCode}`)
                        return JSON.parse(data);
                    });
                });
            case "http:":
                req = httpRequest(options, (res) => {
                    let data = "";

                    res.on("data", (chunk) => {
                        data += chunk;
                    });

                    res.on("close", () => {
                        console.log(`Request completed with status ${res.statusCode}`)
                        return JSON.parse(data);
                    });
                })
            default:
                throw new Error("unsupported protocol")
        }
    }
}
