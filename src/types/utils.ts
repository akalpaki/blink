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
    if (req.body) {
        data.headers = req.headers;
    }

    if (req.body) {
        data.body = req.body;
    }

    return data;
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
