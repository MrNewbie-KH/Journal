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
    const token = jsonwebtoken_1.default.sign(payload, "f73e0b92a27a2486e70b0bf06fc45ed1a26ae15a5ae594006a590b0f5ec47bb8cb5ce7013043721d55134ae658af20c2d979efb44d9dc2e66e8187ff7ed3c02c");
    return token;
};
exports.createJWTAccessToken = createJWTAccessToken;
