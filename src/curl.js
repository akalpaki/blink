import { spawn } from "node:child_process"
// not a complete list, append more if needed
export const HTTPMethods = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
})

export function curl(
    method = HTTPMethods.GET,
    url,
    headers = undefined,
    body = undefined,
) {
    const call = spawn(curl,)

}
