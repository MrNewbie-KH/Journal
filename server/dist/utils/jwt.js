"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTAccessToken = exports.payloadOfJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const payloadOfJWT = function (user) {
    return { id: user.id, email: user.email };
};
exports.payloadOfJWT = payloadOfJWT;
const createJWTAccessToken = function (payload) {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("No secret in the env");
        process.exit(1);
    }
    const token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
};
exports.createJWTAccessToken = createJWTAccessToken;
