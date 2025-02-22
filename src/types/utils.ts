import { RequestData, RequestOptions, Response, ResponseData } from "./request";

export function formatRequestData(req: RequestOptions): RequestData {
    const data: RequestData = {
        url: req.url.toString(),
        name: req.name ? req.name : "",
        method: req.method ? req.method : "GET",
    };

    if (typeof req.headers !== "undefined") {
        data.headers = req.headers;
    }

    if (typeof req.body !== "undefined" && req.body !== null) {
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
