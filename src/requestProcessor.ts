import { DatabaseSync } from "node:sqlite"

export class RequestProcessor {
    #conn; // private connection handler

    constructor(storeLocation = ":memory:") {
        if (storeLocation === ":memory:") {
            console.log("Running in :memory: mode!")
        }
        this.#conn = new DatabaseSync(storeLocation)
    }

}
