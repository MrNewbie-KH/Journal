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
exports.getUser = exports.getAllUsers = exports.deleteUser = void 0;
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
const errorClass_1 = require("../errors/errorClass");
const getAllUsers = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany();
    if (!users) {
        return next(new errorClass_1.AppError("No users currently", 400));
    }
    res.status(200).json({ totalUsers: users.length, data: users });
}));
exports.getAllUsers = getAllUsers;
const getUser = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return next(new errorClass_1.AppError("No user With id " + userId, 400));
    }
    res.status(200).json({ data: user });
}));
exports.getUser = getUser;
const deleteUser = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        return next(new errorClass_1.AppError("User not authorized to delete", 401));
    }
    const userValid = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!userValid) {
        return next(new errorClass_1.AppError("No user With id " + userId, 400));
    }
    yield prisma_1.default.user.delete({
        where: {
            id: userId,
        },
    });
    res.status(200).json({ msg: "User deleted successfully" });
}));
exports.deleteUser = deleteUser;
// const  updateUser = asyncWrapper((req:Request,res:Response,next:NextFunction)=>{
// })
const uploadImage = (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
