export class StoreError extends Error {
    constructor(message: string) {
        super(`StoreError: ${message}`);
        this.name = "StoreError";
    }
}
