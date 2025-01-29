'use strict';

describe("Basic usage of curl", () => {
    test("Get request should work", () => {
        const res = curl("GET", "http://www.example.com")

        expect(res.status).toBe(200);
    })
}) 
