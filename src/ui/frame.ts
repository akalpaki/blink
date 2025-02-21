import blessed from "blessed";

export class Frame {
    #box;
    constructor() {
        this.#box = blessed.box({
            top: "left",
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
    }
}
