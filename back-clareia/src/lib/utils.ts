export function wrapError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    } else {
        return new Error("An unknown error occurred.");
    }
}