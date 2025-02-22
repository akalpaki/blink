export type RequestOptions = {
    id?: number;
    name?: string;
    method?: string;
    url: URL;
    headers?: HeadersInit;
    body?: unknown | null;
    saveResponse?: boolean;
};

export type Response = {
    id?: number;
    status: number;
    headers: Headers;
    mediaType: string;
    body: unknown | null;
};

export type RequestData = {
    id?: number;
    name?: string;
    url: string;
    method?: string;
    headers?: HeadersInit;
    body?: unknown | null;
    created_at?: string;
    updated_at?: string;
};

export type ResponseData = {
    id?: number;
    requestId: number;
    headers?: HeadersInit;
    body?: unknown | null;
    status: number;
    mediaType: string;
    created_at?: string;
    updated_at?: string;
};
