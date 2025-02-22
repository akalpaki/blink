import blessed from "blessed";

export class Frame {
    #box;
    constructor() {
        this.#box = blessed.box({
            width: "25%",
            height: "100%",
            border: {
                type: "line",
            },
            style: {
                fg: "white",
            },
            shadow: false,
        });
    }

    box() {
        return this.#box;
    }
}
