export interface RequestOptions {
    id?: bigint,
    name?: string
    method?: string,
    url: URL,
    headers?: HeadersInit,
    body?: any | null,
}

export interface Response {
    id?: bigint,
    status: number,
    headers: Headers,
    mediaType: string,
    body: any | null,
}

export interface DataModel {
    id?: bigint,
    name?: string,
    url: string,
    method?: string,
    headers?: Headers,
    body?: any | null,
    mediaType?: string,
    created_at?: string,
    updated_at?: string
}
