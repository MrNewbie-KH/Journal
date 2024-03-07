"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAcconut = exports.createJWTAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWTAccessToken = function (user) {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRE) {
        console.log("No secret in the env");
        process.exit(1);
    }
    const token = jsonwebtoken_1.default.sign(user.id, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
    return token;
};
exports.createJWTAccessToken = createJWTAccessToken;
const verifyAcconut = function (token) {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("No secret in the env");
        process.exit(1);
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
};
exports.verifyAcconut = verifyAcconut;
