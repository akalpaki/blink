import { argv } from 'node:process';
import { spawn } from 'node:child_process';

const getArgs = () =>
    argv.reduce((args, arg) => {
        // long args
        if (arg.slice(0, 2) === "--") {
            const longArg = arg.split("=");
            const longArgFlag = longArg[0].slice(2);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue
        }

        // flags
        else if (arg[0] === "-") {
            const flags = arg.slice(1).split("");
            flags.forEach((flag) => {
                args[flag] = true;
            });
        }

        return args;
    }, {});

const args = getArgs();

console.log(args)

const curl = spawn("curl", { url: args.url });

console.log(curl)

curl.stdout.on('data', (data) => {
    console.log(data);
});

curl.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

curl.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
