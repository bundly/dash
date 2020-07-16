export class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const handleError = (err, res) => {
    let { statusCode, message } = err;
    statusCode = statusCode || 401;
    res.status(statusCode).json({
        status: 'error',
        success: false,
        statusCode,
        message
    });
};
