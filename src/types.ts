export interface RequestOptions {
    method?: string,
    url: URL,
    headers?: HeadersInit,
    body?: any | null,
}

export interface Response {
    status: number,
    headers: Headers,
    mediaType: string,
    body: any | null,
}
