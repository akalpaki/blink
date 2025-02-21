import { screen } from "blessed";

export class MyBase {
    #base;

    constructor() {
        this.#base = screen();
    }

    public init() {
        this.#base.render();
    }
}
