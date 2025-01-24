import { argv } from 'node:process';

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


