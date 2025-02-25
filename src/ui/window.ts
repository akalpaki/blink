import blessed from "blessed";

import { Frame } from "./frame.ts";

export class Window {
    #base;

    constructor() {
        this.#base = blessed.screen({
            smartCSR: true,
            dockBorders: true,
        });
        this.#base.title = "blink.";
        this.#base.key(["C-c"], () => {
            return process.exit(0);
        });

        const frame = blessed.box({
            top: "center",
            left: "center",
            width: "100%",
            height: "100%",
            border: {
                type: "line",
            },
            style: {
                fg: "white",
            },
        });

        const testFrame = new Frame({
            left: "25%",
        }).box();

        this.#base.append(frame);
        this.#base.append(testFrame);
        this.#base.key(["C-a"], () => testFrame.focus());
    }

    public init() {
        this.#base.render();
    }
}
