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
        try {
            const reqId = this.#store.storeRequest(formatRequestData(req));

            const res = await doFetch(req);

            if (req.saveResponse) {
                this.#store.storeResponse(formatResponseData(reqId, res));
            }

            return res;
        } catch (err) {
            let message;

            if (err instanceof Error) {
                message = err.message;
            } else {
                message = String(err);
            }

            throw new Error(message);
        }
    }
}
