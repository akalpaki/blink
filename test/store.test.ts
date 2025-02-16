'use strict'

import { Store } from "../src/store"
import { RequestData, ResponseData } from "../src/types"

const testRequest: RequestData = {
    name: "test",
    url: "https://www.example.com",
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
        test: "test"
    })
}

const testResponse: ResponseData = {
    requestId: 0,
    status: 200,
    mediaType: "text",
    headers: {
        "Content-Type": "text/plain"
    },
    body: "test",
}

const testDatabase = new Store();

describe("Basic API of store", () => {
    test("you can store a request", () => {
        const res = testDatabase.storeRequest(testRequest);
        expect(typeof res).toBe("number");
    })

    test("you can store a response", () => {
        const res = testDatabase.storeRequest(testRequest);

        testResponse.requestId = res

        testDatabase.storeResponse(testResponse);
    })
})
