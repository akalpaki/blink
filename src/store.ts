import Database from "better-sqlite3"
import { RequestData, ResponseData } from "./types";

// NOTE: I think requests should be upserts for both request and response data
export class Store {
    private static defaultLocation = ":memory:";
    private static createTablesQuery = `
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        method TEXT,
        media_type TEXT,
        headers TEXT,
        body TEXT,
        created_at TEXT,
        updated_at TEXT
    );
    CREATE TABLE IF NOT EXISTS responses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER,
        status_code INTEGER,
        media_type TEXT,
        headers TEXT,
        body TEXT,
        created_at TEXT,
        updated_at TEXT
    );
`;
    private static insertRequest = `
    INSERT INTO requests(
    name,
    url,
    method,
    headers,
    body,
    created_at
    ) VALUES (?, ?, ?, ?, ?, ?);
`;
    private static insertResponse = `
    INSERT INTO responses(
    request_id,
    status_code,
    media_type,
    headers,
    body,
    created_at
    ) VALUES (?, ?, ?, ?, ?, ?);
`;
    #conn;

    constructor(fileLocation = Store.defaultLocation) {
        if (fileLocation === Store.defaultLocation) {
            console.log("using in memory database!");
        }
        this.#conn = new Database(fileLocation);
        this.#conn.pragma("journal_mode = WAL");
        this.setupDB();
    };

    private setupDB(): void {
        this.#conn.exec(Store.createTablesQuery);
    };

    public storeRequest(data: RequestData): number {
        const stmt = this.#conn.prepare(Store.insertRequest);

        const res = stmt.run(
            data.name,
            data.url,
            data.method,
            data.headers,
            data.body,
            new Date().toISOString(),
        )

        return res.lastInsertRowid as number
    };

    public storeResponse(data: ResponseData): void {
        const stmt = this.#conn.prepare(Store.insertResponse)

        stmt.run(
            data.requestId,
            data.status,
            data.mediaType,
            data.headers,
            data.body,
            new Date().toISOString(),
        )
    }
}
