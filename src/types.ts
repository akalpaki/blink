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
    mediaType?: string,
    created_at?: string,
    updated_at?: string
}

