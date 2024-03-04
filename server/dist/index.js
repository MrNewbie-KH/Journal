"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT;
// ======================================
// routes import 
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
// ======================================
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/users", user_1.default);
app.get("/", (req, res) => {
    res.send("Ts is here now");
});
app.use(errorHandlerMiddleware_1.default);
app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});
