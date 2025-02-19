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

    test("you can retreive a request", () => {
        const requestID = testDatabase.storeRequest(testRequest);

        const request = testDatabase.getRequest(requestID);

        expect(request.url).toBe(testRequest.url)
        expect(request.method).toBe(testRequest.method)
        expect(request.body).toBe(testRequest.body)
        expect(request.headers).toBe(JSON.stringify(testRequest.headers))
    })

    test("you can retreive a response", () => {
        const requestID = testDatabase.storeRequest(testRequest);

        testResponse.requestId = requestID;

        testDatabase.storeResponse(testResponse);

        const response = testDatabase.getResponseByReqId(requestID);

        expect(response.status).toBe(testResponse.status);
        expect(response.mediaType).toBe(testResponse.mediaType);
        expect(response.body).toBe(testResponse.body);
        expect(response.headers).toBe(JSON.stringify(testResponse.headers));
    })
})
