import { doFetch } from "../src/curl";
'use strict';

const testAPIHost = "https://restful-booker.herokuapp.com"

const testPost = JSON.stringify({
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

const testPut = JSON.stringify({
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2018-01-02"
    },
    "additionalneeds": "Dinner"
})

describe("Basic usage of curl", () => {
    test("Get request should work", async () => {
        const res = await doFetch({
            url: new URL(testAPIHost + "/ping"),
        })

        expect(res.status).toBe(201);
    })

    test("Post request should work", async () => {
        const res = await doFetch({
            url: new URL(testAPIHost + "/booking"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: testPost,
        });

        expect(res.status).toBe(200);
        expect(res.body.booking).toEqual(JSON.parse(testPost));
    })

    test("Put request should work", async () => {
        const postRes = await doFetch({
            url: new URL(testAPIHost + "/booking"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: testPost,
        });

        const authRes = await doFetch({
            url: new URL(testAPIHost + "/auth"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username: "admin", password: "password123" })
        })

        const putRes = await doFetch({
            url: new URL(testAPIHost + `/booking/${postRes.body.bookingid}`),
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${authRes.body.token}`
            },
            body: testPut,
        })

        expect(putRes.status).toBe(200);
        expect(putRes.body).toEqual(JSON.parse(testPut))
    });

    test("Delete request should work", async () => {
        const authRes = await doFetch({
            url: new URL(testAPIHost + "/auth"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username: "admin", password: "password123" })
        })

        const postRes = await doFetch({
            url: new URL(testAPIHost + "/booking"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: testPost,
        })

        const deleteRes = await doFetch({
            url: new URL(testAPIHost + `/booking/${postRes.body.bookingid}`),
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "cookie": `token=${authRes.body.token}`
            },
        })

        expect(deleteRes.status).toBe(201)
    })

    test("Patch request should work", async () => {
        const authRes = await doFetch({
            url: new URL(testAPIHost + "/auth"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username: "admin", password: "password123" })
        })

        const postRes = await doFetch({
            url: new URL(testAPIHost + "/booking"),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: testPost,
        })

        const patchRes = await doFetch({
            url: new URL(testAPIHost + `/booking/${postRes.body.bookingid}`),
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "cookie": `token=${authRes.body.token}`
            },
            body: testPut,
        })

        expect(patchRes.status).toBe(200)
        expect(patchRes.body).toEqual(JSON.parse(testPut))
    })
})
