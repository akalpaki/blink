import Database from "better-sqlite3";

import { StoreError } from "./types/error";
import { RequestData, ResponseData } from "./types/model";

// TODO: make save operations upserts
export class Store {
    private static defaultLocation = ":memory:";
    private static createTablesQuery = `
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        name TEXT,
        method TEXT,
        headers TEXT,
        body TEXT,
        createdAt TEXT,
        updatedAt TEXT
    );
    CREATE TABLE IF NOT EXISTS responses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER NOT NULL REFERENCES requests ON UPDATE CASCADE ON DELETE CASCADE,
        status INTEGER,
        mediaType TEXT,
        headers TEXT,
        body TEXT,
        createdAt TEXT,
        updatedAt TEXT
    );
`;
    private static insertRequest = `
    INSERT INTO requests(
    name,
    url,
    method,
    headers,
    body,
    createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)
`;
    private static insertResponse = `
    INSERT INTO responses(
    request_id,
    status,
    mediaType,
    headers,
    body,
    createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)
`;
    private static getRequest = `
    SELECT 
    id,
    name,
    url,
    method,
    headers,
    body,
    createdAt,
    updatedAt
    FROM requests WHERE id = ?;
`;
    private static getResponse = `
    SELECT 
    id,
    request_id,
    status,
    mediaType,
    headers,
    body,
    createdAt,
    updatedAt
    FROM responses WHERE request_id = ?;
`;

    #conn;

    constructor(fileLocation = Store.defaultLocation) {
        if (fileLocation === Store.defaultLocation) {
            console.log("using in memory database!");
        }
        this.#conn = new Database(fileLocation);
        this.#conn.pragma("journal_mode = WAL");
        this.setupDB();
    }

    private setupDB(): void {
        this.#conn.exec(Store.createTablesQuery);
    }

    public storeRequest(data: RequestData): number {
        const stmt = this.#conn.prepare(Store.insertRequest);

        const timestamp = new Date().toISOString();
        let headers = "";

        if (typeof data.headers !== "undefined") {
            headers = JSON.stringify(data.headers);
        }

        const res = stmt.run(
            data.name,
            data.url,
            data.method,
            headers,
            data.body,
            timestamp,
        );

        return res.lastInsertRowid as number;
    }

    public storeResponse(data: ResponseData): void {
        const stmt = this.#conn.prepare(Store.insertResponse);

        const timestamp = new Date().toISOString();
        let headers = "";

        if (typeof data.headers !== "undefined") {
            headers = JSON.stringify(data.headers);
        }

        stmt.run(
            data.requestId,
            data.status,
            data.mediaType,
            headers,
            data.body,
            timestamp,
        );
    }

    public getRequest(id: number): RequestData {
        const stmt = this.#conn.prepare(Store.getRequest);

        const res = stmt.get(id);

        if (!this.isRequestData(res)) {
            throw new StoreError("request not found");
        }

        return res;
    }

    public getResponseByReqId(reqId: number): ResponseData {
        const stmt = this.#conn.prepare(Store.getResponse);

        const res = stmt.get(reqId);

        if (!this.isResponseData(res)) {
            throw new StoreError("response not found");
        }

        return res;
    }

    private isRequestData(value: unknown): value is RequestData {
        return (value as RequestData).method !== undefined;
    }

    private isResponseData(value: unknown): value is ResponseData {
        return (value as ResponseData).mediaType !== undefined;
    }
}
