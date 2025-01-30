import { curl } from "../src/curl"
'use strict';

describe("Basic usage of curl", () => {
    test("Get request should work", () => {
        curl("GET", "http://www.example.com").then((code) => {
            expect(code).toBe(200);
        })
    })
}) 
