"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const passwordUtils_1 = require("../utils/passwordUtils");
const jwt_1 = require("../utils/jwt");
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const errorClass_1 = require("../errors/errorClass");
const authValidation_1 = require("../validation/authValidation");
const signup = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get data from body
    const user = req.body;
    const valid = (0, authValidation_1.validateSignup)(user);
    if (valid.error) {
        return next(new errorClass_1.AppError("All data fields must be provided", 400));
    }
    // test if this user already exists in the database
    const userAlreadyExist = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (userAlreadyExist) {
        return next(new errorClass_1.AppError("This user already exists", 400));
    }
    //   if not  hash the user password
    const hashedPassword = (0, passwordUtils_1.hashPassword)(user.password);
    user.password = hashedPassword;
    // create the user
    const newUser = yield prisma_1.default.user.create({ data: user });
    const payload = (0, jwt_1.payloadOfJWT)(newUser);
    // send email ti him to verify he is the one 
    const accessToken = (0, jwt_1.createJWTAccessToken)(payload);
    res.status(200).json({ data: newUser, accessToken });
}));
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get data from body
    const user = req.body;
    const valid = (0, authValidation_1.validateLogin)(user);
    if (valid.error) {
        return next(new errorClass_1.AppError("All data fields must be provided", 400));
    }
    // test if this user already exists in the database
    const userAlreadyExist = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!userAlreadyExist) {
        return next(new errorClass_1.AppError("Password or email is not correct", 400));
    }
    const isPasswordCorrect = yield (0, passwordUtils_1.passwordCompare)(user.password, userAlreadyExist.password);
    if (!isPasswordCorrect) {
        throw new Error("Password or email is not correct");
    }
    //   if user passed successfully create a token for him
    const payload = (0, jwt_1.payloadOfJWT)(userAlreadyExist);
    const accessToken = (0, jwt_1.createJWTAccessToken)(payload);
    res.status(200).json({ data: userAlreadyExist, accessToken });
});
exports.login = login;
