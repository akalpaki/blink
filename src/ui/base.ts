import blessed from "blessed";

export class Base {
    #base;

    constructor() {
        this.#base = blessed.screen({
            smartCSR: true,
        });
        this.#base.title = "blink.";

        const frame = blessed.box({
            top: "center",
            left: "center",
        });

        this.#base.append(frame);
    }

    public init() {
        this.#base.render();
    }
}
