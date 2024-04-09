export class NotFoundError extends Error {
    public statusCode: number;

    constructor(name = 'Not Found', statusCode = 404) {
        super(name);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class InvalidDataError extends Error {
    public statusCode: number;

    constructor(name = 'Invalid Data', statusCode = 400) {
        super(name);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class InternalServerError extends Error {
    public statusCode: number;

    constructor(name: string, statusCode = 500) {
        super(name);
        this.name = `Internal Server Error: ${name}`;
        this.statusCode = statusCode;
    }
}