export class ClassValidationError extends Error {
    constructor(readonly errors: any[]) {
        super('A validation error occurred');
        Object.setPrototypeOf(this, new.target.prototype);
    }
}