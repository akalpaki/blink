import Database from "better-sqlite3"

import { DataModel, RequestOptions, Response } from "./types";
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
                const data: DataModel = {
                    url: req.url.toString(),
                    method: "",
                }

                if (typeof req.name !== "undefined") {
                    data.name = req.name;
                }

                if (typeof req.method !== "undefined") {
                    data.method = req.method
                }

                if (typeof req.headers !== "undefined") {
                    data.headers = req.headers
                }

                if (typeof req.body !== "undefined") {
                    data.body = req.body
                }

                const id = this.saveData(data)
                req.id = id as bigint

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
);`)
    }

    private saveData(data: DataModel): number | bigint {
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
