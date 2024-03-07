"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorClass_1 = require("../errors/errorClass");
const handleJsonWebTokenError = () => new errorClass_1.AppError('Invalid access. Please log in again!', 401);
const handleTokenExpiredError = () => new errorClass_1.AppError('Your token has expired. Please log in again!', 401);
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
    });
};
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
    }
};
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        console.log("A7A");
        let error = Object.create(err);
        if (error.name === 'JsonWebTokenError')
            error = handleJsonWebTokenError();
        if (error.name === 'TokenExpiredError')
            error = handleTokenExpiredError();
        sendErrorDev(error, req, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err); // Create a shallow copy to avoid mutating the original error object
        if (error.name === 'JsonWebTokenError')
            error = handleJsonWebTokenError();
        if (error.name === 'TokenExpiredError')
            error = handleTokenExpiredError();
        sendErrorProd(error, req, res);
    }
};
