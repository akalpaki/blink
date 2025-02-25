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
