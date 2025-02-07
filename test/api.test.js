import { doFetch } from "../src/curl";
'use strict';

const testAPIHost = "https://restful-booker.herokuapp.com"

describe("Basic usage of curl", () => {
    test("Get request should work", async () => {
        const res = await doFetch({
            url: testAPIHost + "/ping",
        })

        expect(res.status).toBe(201);
    })
    test("Post request should work", async () => {
        const res = await doFetch({
            url: testAPIHost + "/booking",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2018-01-02"
                },
                "additionalneeds": "Breakfast"
            })
        })

        console.log(res)

        expect(res.status).toBe(200);
    })
})
