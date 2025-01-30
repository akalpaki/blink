import { curl } from "../src/curl"
'use strict';

describe("Basic usage of curl", () => {
    test("Get request should work", async () => {
        const res = await curl("GET", "http://www.example.com")
        expect(res.code).toBe(200)
    })
})
