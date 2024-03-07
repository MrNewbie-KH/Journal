"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSignup = (signup) => {
    // create the chema
    const signupSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).max(20).required(),
        firstName: joi_1.default.string().min(1).max(20).required(),
        lastName: joi_1.default.string().min(1).max(20).required(),
    });
    return signupSchema.validate(signup);
};
exports.validateSignup = validateSignup;
const validateLogin = (login) => {
    // create the chema
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).max(20).required(),
    });
    return loginSchema.validate(login);
};
exports.validateLogin = validateLogin;
