import Database from "better-sqlite3"

export type RequestOptions = {
    id?: bigint,
    name?: string
    method?: string,
    url: URL,
    headers?: HeadersInit,
    body?: any | null,
    saveResponse?: boolean
}

export type Response = {
    id?: bigint,
    status: number,
    headers: Headers,
    mediaType: string,
    body: any | null,
}

export type RequestData = {
    id?: bigint,
    name?: string,
    url: string,
    method?: string,
    headers?: HeadersInit,
    body?: any | null,
    created_at?: string,
    updated_at?: string
}

export type ResponseData = {
    id?: bigint,
    requestId: bigint,
    headers?: HeadersInit,
    body?: any | null,
    status: number,
    mediaType: string,
    created_at?: string,
    updated_at?: string
}

export function formatRequestData(req: RequestOptions): RequestData {
    let data: RequestData = {
        url: req.url.toString(),
        name: req.name ? req.name : "",
        method: req.method ? req.method : "GET",
    }

    if (typeof req.headers !== "undefined") {
        data.headers = req.headers
    }

    if (typeof req.body !== "undefined" && req.body !== null) {
        data.body = req.body
    }

    return data
}

export function formatResponseData(res: Response): ResponseData {
    let data: ResponseData = {
        id: res.id ? res.id : undefined,
        requestId: res.id as bigint,
        status: res.status,
        mediaType: res.mediaType,
    }

    if (typeof res.headers !== "undefined") {
        data.headers = res.headers
    }

    if (typeof res.body !== "undefined" && res.body !== null) {
        data.body = res.body
    }

    return data
}
