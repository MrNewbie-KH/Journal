 import {login, signup} from "../controllers/auth"
 import express from "express"
 const router = express.Router();
 import asyncWrapper from "../utils/asyncWrapper";
 router.route("/signup").post(signup);
 router.route("/login").post(login);
 export default router;
