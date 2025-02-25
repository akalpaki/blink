import blessed from "blessed";

import type { FrameOptions } from "../types/frameOptions.ts";

export class Frame {
    #box;
    // NOTE: think of a better approach for FrameOptions
    // all options are technically optional, but probably need to provide
    // default values
    constructor(opts: FrameOptions) {
        this.#box = blessed.box({
            top: opts.top,
            bottom: opts.bottom,
            left: opts.left,
            right: opts.right,
            width: opts.width,
            height: opts.height,
            border: {
                type: "line",
            },
            style: {
                fg: "white",
            },
            focusable: true,
        });

        this.#box.on("focus", () => {
            this.#box.style.border.bg = "red";
        });
    }

    box() {
        return this.#box;
    }
}
