import blessed from "blessed";

export class MyBase {
    #base;

    constructor() {
        this.#base = blessed.screen();
    }

    public init() {
        this.#base.render();
    }
}
