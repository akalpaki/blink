import {
    Config,
    formatRequestData,
    formatResponseData,
    RequestOptions,
    Response,
} from "./types";
import { doFetch } from "./curl";
import { Store } from "./store";

export class RequestProcessor {
    #store: Store;

    constructor(cfg: Config) {
        this.#store = new Store(cfg.storeLocation);
    }

    public async doRequest(req: RequestOptions): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            try {
                const reqId = this.#store.storeRequest(formatRequestData(req))

                const res = await doFetch(req);

                if (req.saveResponse) {
                    this.#store.storeResponse(formatResponseData(reqId, res))
                }

                resolve(res);
            } catch (err) {
                reject(err)
            };
        })
    }
}
