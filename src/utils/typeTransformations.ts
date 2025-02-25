import { RequestOptions, Response } from "../types/request";
import { RequestData, ResponseData } from "../types/model";

export function requestToModel(req: RequestOptions): RequestData {
    return {
        url: req.url.toString(),
        name: req.name ? req.name : "",
        method: req.method ? req.method : "GET",
        headers: req.headers ? req.headers : undefined,
        body: req.body ? req.body : undefined,
    };
}

export function responseToModel(reqId: number, res: Response): ResponseData {
    return {
        id: res.id ? res.id : undefined,
        requestId: reqId,
        status: res.status,
        mediaType: res.mediaType,
        headers: res.headers ? res.headers : undefined,
        body: res.body ? res.body : undefined,
    };
}
