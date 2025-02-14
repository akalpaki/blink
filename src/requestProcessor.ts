import Database from "better-sqlite3"

import { RequestData, RequestOptions, Response, ResponseData } from "./types";
import { doFetch } from "./curl";

export class RequestProcessor {
    private conn; // private connection handler

    constructor(storeLocation = ":memory:") {
        if (storeLocation === ":memory:") {
            console.log("Running in :memory: mode!")
        }
        this.conn = new Database(storeLocation)
        this.conn.pragma("journal_mode = WAL")
        this.setupDatabase()
    }

    public async doRequest(req: RequestOptions): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await doFetch(req);

                resolve(res);
            } catch (err) {
                reject(err)
            };
        })
    }

    private setupDatabase() {
        this.conn.exec(`
CREATE TABLE IF NOT EXISTS requests(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
url TEXT NOT NULL,
method TEXT,
headers TEXT,
body TEXT,
mediaType TEXT,
created_at TEXT,
updated_at TEXT
);

CREATE TABLE IF NOT EXISTS responses(
id INTEGER PRIMARY KEY AUTOINCREMENT,
request_id INTEGER,
headers TEXT,
body TEXT,
status_code INTEGER,
mediaType TEXT,
created_at TEXT,
updated_at TEXT
);`)
    }

    private saveRequestData(data: RequestData): number | bigint {
        const stmt = this.conn.prepare(`INSERT INTO requests(name,url,method,headers,body,mediaType) VALUES (?,?,?,?,?,?) RETURNING id`)

        const res = stmt.run(
            data.name,
            data.url,
            data.method,
            data.headers,
            data.body,
            data.mediaType,
        )

        return res.lastInsertRowid
    }

}
