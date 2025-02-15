import pkg from "blessed";
const { screen, box } = pkg;

// TODO: FIX THIS ONCE INTERNALS ARE DONE


const scr = screen({
    smartCSR: true,
});

scr.key(["escape", "q", "C-c"], (ch, key) => {
    return process.exit(0)
})

const b = box({
    top: "center",
    left: "center",
    width: "50%",
    height: "50%",
    content: "Hello, {bold}world{/bold}!",
    tags: true,
    border: {
        type: "line",
    },
    style: {
        fg: "white",
        bg: "magenta",
        border: {
            fg: "#f0f0f0"
        },
        hover: {
            bg: "green"
        }
    }
});

b.on("click", (data) => {
    b.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    scr.render();
});

scr.append(b);

scr.render();




//OLD code
//import { argv } from 'node:process';
//import { spawn } from 'node:child_process';
//
//class ProgramArguments {
//    constructor() {
//
//    }
//
//    static #getLongArg(name, type, validationFunc = undefined) {
//        argv.reducer((args, arg) => {
//            const flag = arg.split("=");
//            const flagName = flag
//
//
//            if (!this.#checkType(arg, type)) {
//                throw new Error(`invalid type for flag ${name}`)
//            }
//        });
//    }
//
//    static #getLongArg(name, type, validationFunc = undefined) { }
//
//    static #checkType(type, value) {
//        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type
//    }
//}
//
//const getArgs = () =>
//    argv.reduce((args, arg) => {
//        // long args
//        if (arg.slice(0, 2) === "--") {
//            const longArg = arg.split("=");
//            const longArgFlag = longArg[0].slice(2);
//            const longArgValue = longArg.length > 1 ? longArg[1] : true;
//            args[longArgFlag] = longArgValue
//        }
//
//        // flags
//        else if (arg[0] === "-") {
//            const flags = arg.slice(1).split("");
//            flags.forEach((flag) => {
//                args[flag] = true;
//            });
//        }
//
//        return args;
//    }, {});
//
//const curl = (url, method) => {
//    const call = spawn("curl", [
//        url,
//        method,
//    ])
//
//    call.stdout.on("data", (data) => {
//        console.log(data);
//    })
//
//    call.on("close", (code) => {
//        console.log(`child process exited with code ${code}`);
//    });
//}
//
//const args = getArgs();
//
//
//curl(args.url, args.method)
