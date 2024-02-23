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
exports.passwordCompare = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// hashing password and return the new password
const hashPassword = function (oldPassword) {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(oldPassword, salt);
    return hash;
};
exports.hashPassword = hashPassword;
// compare password here in case of login
const passwordCompare = function (input, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isEqual = yield bcryptjs_1.default.compare(input, password);
        return isEqual;
    });
};
exports.passwordCompare = passwordCompare;
