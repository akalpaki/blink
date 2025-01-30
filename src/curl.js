import { spawn } from "node:child_process"

export function curl(
    method,
    url,
    headers,
    body,
) {
    return new Promise((resolve, reject) => {
        const args = [];

        if (typeof method !== 'undefined') {
            args.push(`-X ${method}`)
        }

        if (typeof headers !== 'undefined') {
            headers.forEach((header) => {
                const headerLine = `${header.name}`
                if (header.value) {
                    headerLine + `:${header.value}`
                } else {
                    headerLine + ";"
                }

                args.push(`-H "${headerLine}"`); // NOTE: escape the quote marks?
            })
        }

        if (typeof body !== 'undefined') {
            const encodedBody = JSON.stringify(body)
            args.push(`-d ${encodedBody}`)
        }

        args.push(url)

        const call = spawn("curl", args)

        call.on("close", (code) => {
            resolve(code)
        })

        call.on("error", (err) => {
            reject(err)
        })
    })
}
