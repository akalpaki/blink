// Minor: I would propose to put this file into /utils folder since it is not a part of TS signatures.

import { RequestData, RequestOptions, Response, ResponseData } from "./request";

export function formatRequestData(req: RequestOptions): RequestData {
    const data: RequestData = {
        url: req.url.toString(),
        name: req.name ? req.name : "",
        method: req.method ? req.method : "GET",
    };

    // https://javascript.info/type-conversions#boolean-conversion
    // since js allows types conversion req.body will be converted into boolean, so we can simplify the code
    if (req.headers) {
        data.headers = req.headers;
    }

    if (req.body) {
        data.body = req.body;
    }

    // just find more elegant to add conditional property
    // https://elvisciotti.medium.com/conditional-adding-object-properties-in-javascript-in-one-line-de97f5de449a
    return {
        ...data,
        // https://elvisciotti.medium.com/conditional-adding-object-properties-in-javascript-in-one-line-de97f5de449a
        // try to remove !! part and find TS error:
        // Spread types may only be created from object types.ts(2698)
        // https://cumsum.wordpress.com/2021/10/10/typescript-spread-types-may-only-be-created-from-object-types/
        //  so !! is another to convert type to boolean
        ...(!!req.body && { body: data.body }),
        ...(!!req.headers && { headers: data.headers }),
    };

    // return data;
}

export function formatResponseData(reqId: number, res: Response): ResponseData {
    const data: ResponseData = {
        id: res.id ? res.id : undefined,
        requestId: reqId,
        status: res.status,
        mediaType: res.mediaType,
    };

    if (typeof res.headers !== "undefined") {
        data.headers = res.headers;
    }

    if (typeof res.body !== "undefined" && res.body !== null) {
        data.body = res.body;
    }

    return data;
}
