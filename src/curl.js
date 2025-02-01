import { spawn } from "node:child_process"

/**
 * @param {string} method 
 * @param {string} url 
 * @param {object} body 
    */
export function makeRequest(
    method,
    url,
    headers,
    body,
) {
    return new Promise((resolve, reject) => {
        const args = getArgs(method, url, headers, body);
        const res = [];
        let err = ""

        const call = spawn("curl", args);

        call.stdout.on("data", (data) => {
            console.log(data.toString());
            res.push(data);
        });

        call.stderr.on("data", (data) => {
            err += data;
        });

        call.on("close", () => {
            if (err !== "") {
                reject(err)
            }
            resolve(res.join())
        });

    });
}

const getArgs = (
    method,
    url,
    headers,
    body,
) => {
    const args = [];

    if (typeof method !== 'undefined') {
        args.push(`-X ${method}`);
    }

    if (typeof headers !== 'undefined') {
        headers.forEach((header) => {
            const headerLine = `${header.name}`;
            if (header.value) {
                headerLine + `:${header.value}`;
            } else {
                headerLine + ";";
            }

            args.push(`-H "${headerLine}"`);
        });
    }

    if (typeof body !== 'undefined') {
        const encodedBody = JSON.stringify(body)
        args.push(`-d ${encodedBody}`);
    }

    args.push(url);

    return args
}
