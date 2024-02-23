 import {login, signup} from "../controllers/auth"
 import express from "express"
 const router = express.Router();
 import asyncWrapper from "../utils/asyncWrapper";
 router.route("/signup").post(asyncWrapper(signup));
 router.route("/login").post(asyncWrapper(login));
 export default router;
