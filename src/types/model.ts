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
