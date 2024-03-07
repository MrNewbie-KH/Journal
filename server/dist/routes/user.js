"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.route("/").get(user_1.getAllUsers);
// router.route("/:id").patch(updateUser);
// router.route("/profileImage").post(uploadImage);
router.route("/:id").delete(authMiddleware_1.default, user_1.deleteUser);
router.route("/:id").get(user_1.getUser);
exports.default = router;
