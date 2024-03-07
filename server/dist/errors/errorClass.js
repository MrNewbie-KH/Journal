"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const createError = (message, statusCode) => {
    return new AppError(message, statusCode);
};
exports.createError = createError;
